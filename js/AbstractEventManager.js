define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function AbstractEventManager() {
				this._eventEmitters = {};
			},
			functions: {
				on: function (eventName) {
					let eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter === undefined) {
						eventEmitter = new ng.core.EventEmitter();
						this._eventEmitters[eventName] = eventEmitter;
					}
					return eventEmitter;
				},
				emit: function (eventName, evt) {
					const eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter !== undefined) {
						eventEmitter.emit(evt);
					}
				},
				off: function (eventSubscriber) {
					eventSubscriber.unsubscribe();
				}
			}
		});
	}
);