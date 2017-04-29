define(["AppUtils", "AnimationManager"],
	function (AppUtils, AnimationManager) {
		const conf = AppUtils.getDirectiveConfiguration("[animation]", {
			inputs: ["animation"]
		});
		return ng.core.Directive(conf).Class({
			constructor: [AnimationManager, ng.core.ElementRef,
				function AnimationDirective(AnimationManager, ElementRef) {
					this._animationManager = AnimationManager;
					this._element = ElementRef.nativeElement;
					this._currentAnimation = null;
				}
			],
			ngOnInit: function () {
				this._element.style["-webkit-animation-duration"] = this._animationManager.duration + "ms";
				this._setAnimation(this._animationManager.enterAnimation);
			},
			ngOnChanges: function (changes) {
				if (changes.hasOwnProperty("animation")) {
					this._setAnimation(changes.animation.currentValue);
				}
			},
			_setAnimation: function (animation) {
				if (this._currentAnimation !== animation) {
					this._currentAnimation = animation;
					this._element.className = "";
					this._element.classList.add("animated");
					this._element.classList.add(this._currentAnimation);
				}
			}
		});
	});	