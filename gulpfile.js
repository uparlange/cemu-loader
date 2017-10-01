'use strict';

const pkg = require('./package.json');

const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const mergeStream = require('merge-stream');
const htmlparser = require('htmlparser2');
const fs = require('fs');
const htmlclean = require('gulp-htmlclean');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('clean-dist', () => {
    return del(['./dist']);
});

gulp.task('copy-files', (callback) => {
    runSequence('copy-js', 'copy-css', 'copy-html', 'copy-images', 'copy-static', callback);
});

gulp.task('copy-js', () => {
    return gulp.src('js/*.js')
        .pipe(uglify({ keep_fnames: true }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-css', () => {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-images', () => {
    return gulp.src('images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy-html', () => {
    const streams = mergeStream();
    streams.add(gulp.src('html/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('dist/html')));
    streams.add(gulp.src('index.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('dist')));
    return streams;
});

gulp.task('copy-static', () => {
    const streams = mergeStream();
    ['package.json'].forEach((item) => {
        streams.add(gulp.src([item])
            .pipe(gulp.dest('dist/')));
    });
    ['data', 'node_modules/font-awesome/fonts'].forEach((item) => {
        streams.add(gulp.src([item + '/**/*'])
            .pipe(gulp.dest('dist/' + item)));
    });
    return streams;
});

gulp.task('copy-node-modules', () => {
    const streams = mergeStream();
    const urls = [];
    const parser = new htmlparser.Parser({
        onopentag: (tagname, attributes) => {
            let attribute = null;
            switch (tagname) {
                case 'script':
                    attribute = 'src';
                    break;
                case 'link':
                    attribute = 'href';
                    break;
            }
            if (attributes[attribute] !== undefined && attributes[attribute].indexOf('node_modules') !== -1) {
                const url = attributes[attribute];
                urls.push(url);
                const dest = 'dist/' + url.substring(0, url.lastIndexOf("/"));
                const begin = url.lastIndexOf("/") + 1;
                const name = url.substring(begin);
                streams.add(gulp.src([url])
                    .pipe(gulp.dest(dest)));
            }
        }
    }, { decodeEntities: true });
    const addDependency = function (dependency) {
        const fs = require("fs");
        const folder = './node_modules/' + dependency;
        streams.add(gulp.src([folder + '/**/*'])
            .pipe(gulp.dest('./dist/node_modules/' + dependency)));
        if (fs.existsSync(folder + '/package.json')) {
            const pkg2 = require(folder + '/package.json');
            for (let dependency in pkg2.dependencies) {
                addDependency(dependency);
            }
        }
    };
    parser.write(fs.readFileSync('index.html', 'utf8'));
    parser.end();
    const files = [];
    for (let dependency in pkg.dependencies) {
        let toAdd = true;
        urls.forEach(function (url) {
            if (url.indexOf('/' + dependency + '/') !== -1) {
                toAdd = false;
                return;
            }
        });
        if (toAdd) {
            addDependency(dependency);
        }
    }
    return streams;
});

gulp.task('generate-release', () => {
    return gulp.src('dist/**/*')
        .pipe(zip(pkg.name + '-' + pkg.version + '.nw'))
        .pipe(gulp.dest('release'));
});

gulp.task('lint-js', () => {
    return gulp.src(['js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', (callback) => {
    runSequence('lint-js', 'clean-dist', 'copy-files', 'copy-node-modules', 'generate-release', callback);
});