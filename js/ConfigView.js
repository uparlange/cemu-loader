define(["AppUtils"],
	function (AppUtils) {
		const conf = AppUtils.getComponentConfiguration("config");
		return ng.core.Component(conf).Class({
			constructor: [
				function ConfigView() {

				}
			]
		})
	});