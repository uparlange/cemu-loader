define(["AppUtils", "AnimationManager"],
	function (AppUtils, AnimationManager) {
		return AppUtils.getClass({
			constructor: function ViewCanDeactivate(AnimationManager) {
				this._animationManager = AnimationManager;
			},
			parameters: [
				[AnimationManager]
			],
			functions: {
				canDeactivate: function (component) {
					const eventEmitter = new ng.core.EventEmitter();
					const leaveAnimation = this._animationManager.leaveAnimation;
					const animationDuration = (leaveAnimation != null) ? this._animationManager.duration : 0;
					if (animationDuration !== 0) {
						component.animation = leaveAnimation;
						component.duration = animationDuration;
					}
					setTimeout(() => {
						eventEmitter.emit(true);
					}, animationDuration);
					return eventEmitter;
				}
			}
		});
	}
);