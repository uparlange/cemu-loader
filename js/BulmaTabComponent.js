define(["AppUtils", "AbstractEventManager"],
	function (AppUtils, AbstractEventManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function BulmaTabComponent() {
				AbstractEventManager.call(this);
				this.id = null;
				this.active = false;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-tab-component", {
					inputs: ["id", "active"]
				}))
			],
			functions: {
				onClick: function () {
					this.emit("tabClick", { id: this.id });
				}
			}
		});
	}
);