define(["AppUtils", "AbstractEventManager"],
	function (AppUtils, AbstractEventManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function PanelHeaderComponent() {
				AbstractEventManager.call(this);
				this.icon = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("panel-header-component", {
					inputs: ["icon"]
				}))
			],
			functions: {
				onClick: function () {
					this.emit("headerClick");
				}
			}
		});
	}
);