define(["AnimationManager"],
	function (AnimationManager) {
		return ng.core.Class({
			constructor: [AnimationManager,
				function AnimationCanDeactivate(AnimationManager) {
					this._animationManager = AnimationManager;
				}
			],
			canDeactivate: function (component) {
				component.animation = this._animationManager.leaveAnimation;
				const eventEmitter = new ng.core.EventEmitter();
				setTimeout(() => {
					eventEmitter.emit(true);
				}, this._animationManager.duration);
				return eventEmitter;
			}
		});
	});