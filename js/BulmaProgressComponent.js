define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function BulmaProgressComponent() {
				this.value = 0;
				this.max = 0;
				this.theme = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-progress-component", {
					inputs: ["value", "max", "theme"]
				}))
			]
		});
	}
);