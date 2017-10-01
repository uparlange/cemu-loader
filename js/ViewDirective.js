define(["AppUtils", "AnimationManager"],
	function (AppUtils, AnimationManager) {
		return AppUtils.getClass({
			constructor: function ViewDirective(AnimationManager) {
				this._animationManager = AnimationManager;
				this.durationChange = new ng.core.EventEmitter();
				this.animationChange = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Directive({
					selector: "[view]",
					inputs: ["animation", "duration"],
					outputs: ["animationChange", "durationChange"]
				})
			],
			parameters: [
				[AnimationManager]
			],
			functions: {
				ngOnInit: function () {
					if (this._animationManager.enterAnimation != null) {
						this._setAnimation(this._animationManager.enterAnimation);
						this._setDuration(this._animationManager.duration);
					}
				},
				_setDuration: function (value) {
					this.duration = value;
					this.durationChange.emit(value);
				},
				_setAnimation: function (value) {
					this.animation = value;
					this.animationChange.emit(value);
				}
			}
		});
	}
);	