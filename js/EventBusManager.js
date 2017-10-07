define(["AppUtils", "AbstractEventManager"],
	function (AppUtils, AbstractEventManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function EventBusManager() {
				AbstractEventManager.call(this);
			}
		});
	}
);