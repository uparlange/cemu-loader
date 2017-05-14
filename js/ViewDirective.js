define(["AppUtils", "AnimationManager"],
	function (AppUtils, AnimationManager) {
		const conf = AppUtils.getDirectiveConfiguration("[view]", {
			inputs: ["animation", "duration"],
			outputs: ["animationChange", "durationChange"]
		});
		return ng.core.Directive(conf).Class({
			constructor: [AnimationManager,
				function ViewDirective(AnimationManager) {
					this._animationManager = AnimationManager;
					this.durationChange = new ng.core.EventEmitter();
					this.animationChange = new ng.core.EventEmitter();
				}
			],
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
		});
	});	