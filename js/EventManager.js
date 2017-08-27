define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function EventManager() {
				this._eventEmitters = {};
			},
			functions: [
				function on(eventName) {
					let eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter === undefined) {
						eventEmitter = new ng.core.EventEmitter();
						this._eventEmitters[eventName] = eventEmitter;
					}
					return eventEmitter;
				},
				function emit(eventName, evt) {
					const eventEmitter = this._eventEmitters[eventName];
					if (eventEmitter !== undefined) {
						eventEmitter.emit(evt);
					}
				},
				function off(eventSubscriber) {
					eventSubscriber.unsubscribe();
				}
			]
		});
	}
);