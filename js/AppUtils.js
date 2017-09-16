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
				conf.functions.forEach((element) => {
					c.prototype[element.name] = element;
				});
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