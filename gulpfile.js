'use strict';

const pkg = require('./package.json');

const gulp = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const zip = require('gulp-zip');
const mergeStream = require('merge-stream');
const htmlparser = require('htmlparser2');
const fs = require('fs');
const htmlclean = require('gulp-htmlclean');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const exec = require('gulp-exec');
const rename = require('gulp-rename');

gulp.task('clean-dist', () => {
    return del(['./dist']);
});

gulp.task('copy-js', () => {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/cemu-loader/js'));
});

gulp.task('copy-css', () => {
    return gulp.src('css/*.css')
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('dist/cemu-loader/css'));
});

gulp.task('copy-images', () => {
    return gulp.src('images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/cemu-loader/images'));
});

gulp.task('copy-html', () => {
    const streams = mergeStream();
    streams.add(gulp.src('html/*.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('dist/cemu-loader/html')));
    streams.add(gulp.src('index.html')
        .pipe(htmlclean())
        .pipe(gulp.dest('dist/cemu-loader')));
    return streams;
});

gulp.task('copy-static', () => {
    const streams = mergeStream();
    ['package.json'].forEach((item) => {
        streams.add(gulp.src([item])
            .pipe(gulp.dest('dist/cemu-loader')));
    });
    ['data', 'node_modules/font-awesome/fonts'].forEach((item) => {
        streams.add(gulp.src([item + '/**/*'])
            .pipe(gulp.dest('dist/cemu-loader/' + item)));
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
                const dest = 'dist/cemu-loader/' + url.substring(0, url.lastIndexOf("/"));
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
            .pipe(gulp.dest('./dist/cemu-loader/node_modules/' + dependency)));
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

gulp.task('lint-js', () => {
    return gulp.src(['js/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('copy-nw', () => {
    return gulp.src('node_modules/nw/nwjs/**/*')
        .pipe(gulp.dest('dist/nw'));
});

gulp.task('move-rename-exe', () => {
    return gulp.src('dist/release.exe')
        .pipe(rename(pkg.name + '-' + pkg.version + '.exe'))
        .pipe(gulp.dest("./release"));
});

gulp.task('generate-exe', () => {
    const options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
    };
    const reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    }
    return gulp.src('.')
        .pipe(exec('generate-exe.bat', options))
        .pipe(exec.reporter(reportOptions));
});

gulp.task('generate-package-file', () => {
    return gulp.src('dist/cemu-loader/**/*')
        .pipe(zip(pkg.name + '-' + pkg.version + '.nw'))
        .pipe(gulp.dest('release'));
});

gulp.task('copy-files', gulp.parallel('copy-js', 'copy-css', 'copy-html', 'copy-images', 'copy-static'));

gulp.task('prepare', gulp.series('lint-js', 'clean-dist', 'copy-files', 'copy-node-modules'));

gulp.task('generate-exe-file', gulp.series('copy-nw', 'generate-exe', 'move-rename-exe'));

gulp.task('default', gulp.series('prepare', 'generate-package-file', 'generate-exe-file'));