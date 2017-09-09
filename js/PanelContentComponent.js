define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function PanelContentComponent() {
				this.visible = true;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("panel-content-component", {
					inputs: ["visible"]
				}))
			]
		});
	}
);