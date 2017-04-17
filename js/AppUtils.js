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
		getDatabaseFile: function () {
			const path = require("path");
			return path.resolve() + "\\data\\wiiutdb.xml";
		},
		getHomeDir:function() {
			const os = require("os");
			return os.homedir();
		},
		getConfigFile: function () {
			return this.getHomeDir() + "\\" + this.getPackage().name + ".json";
		}
	};
});