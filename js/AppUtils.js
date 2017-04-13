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
		getModuleName: function (moduleName) {
			return "" + moduleName + "#module";
		},
		getPackage: function () {
			return require("./package.json");
		},
		getBaseConfigFile: function () {
			const path = require("path");
			return path.resolve() + "\\data\\config.json";
		},
		getConfigFile: function () {
			const os = require("os");
			return os.homedir() + "\\" + this.getPackage().name + ".json";
		}
	};
});