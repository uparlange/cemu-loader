define(function () {
	return {
		getComponentConfiguration: function (componentName, params) {
			const defaultParams = {
				selector: componentName,
				templateUrl: "html/" + componentName + "-template" + ".html",
				styleUrls: ["css/" + componentName + "-template.css"]
			};
			return Object.assign({}, defaultParams, params);
		},
		getDirectiveConfiguration: function (selector, params) {
			const defaultParams = {
				selector: selector
			};
			return Object.assign({}, defaultParams, params);
		},
		getModuleName: function (moduleName) {
			return "" + moduleName + "#module";
		},
		getPackageFile: function () {
			return require("./package.json");
		},
		getAnimationsFile: function () {
			return require("./data/animations.json");
		},
		getDatabaseFile: function () {
			const path = require("path");
			return path.resolve() + "\\data\\wiiutdb.xml";
		},
		getHomeDir: function () {
			const os = require("os");
			return os.homedir();
		},
		getConfigFile: function () {
			return this.getHomeDir() + "\\" + this.getPackageFile().name + ".json";
		}
	};
});