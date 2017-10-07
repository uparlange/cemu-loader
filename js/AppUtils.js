define(function () {
	return {
		getClass: function (conf) {
			const c = conf.constructor;
			if (conf.extends) {
				c.prototype = Object.create(conf.extends.prototype);
				c.prototype.constructor = c;
			}
			if (conf.annotations) {
				c.annotations = conf.annotations;
			}
			if (conf.parameters) {
				c.parameters = conf.parameters;
			}
			if (conf.functions) {
				for (var fname in conf.functions) {
					c.prototype[fname] = conf.functions[fname];
				}
			}
			return c;
		},
		getLazyModuleClass: function (conf) {
			return {
				module: this.getClass(conf)
			};
		},
		getLazyModuleName: function (moduleName) {
			return moduleName + "#module";
		},
		getComponentConfiguration: function (componentName, params) {
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + ".html",
				styleUrls: ["css/" + componentName + ".css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getUID: function () {
			const S4 = function () {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
			}
			return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
		},
		getPackageFile: function () {
			return require("./package.json");
		},
		getAnimationsFile: function () {
			return require("./data/animations.json");
		},
		getConfigFile: function () {
			return require("./data/configuration.json");
		},
		getDatabasePath: function () {
			const path = require("path");
			return path.resolve() + "\\data\\wiiutdb.xml";
		},
		getDesktopPath: function () {
			return this._getHomeDir() + "\\Desktop";
		},
		getPicturesPath: function () {
			const pkg = this.getPackageFile();
			const fs = require("fs");
			const path = this._getHomeDir() + "\\Pictures\\" + pkg.name;
			if (!fs.existsSync(path)) {
				fs.mkdirSync(path);
			}
			return path;
		},
		getUserConfigPath: function () {
			return this._getHomeDir() + "\\" + this.getPackageFile().name + ".json";
		},
		getRemotePackageUrl: function () {
			return "https://raw.githubusercontent.com/uparlange/cemu-loader/master/package.json";
		},
		getRemoteApplicationDownloadUrl: function (version) {
			return "https://github.com/uparlange/cemu-loader/raw/master/release/cemu-loader-" + version + ".nw";
		},
		_getHomeDir: function () {
			const os = require("os");
			return os.homedir();
		}
	};
});