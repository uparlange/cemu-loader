define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function ConfigView() {

			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-view"))
			]
		});
	}
);