define(["AppUtils", "AnimationManager"],
	function (AppUtils, AnimationManager) {
		const conf = AppUtils.getDirectiveConfiguration("[animation]", {
			inputs: ["animation"],
			outputs: ["onComplete"]
		});
		return ng.core.Directive(conf).Class({
			constructor: [AnimationManager, ng.core.ElementRef,
				function AnimationDirective(AnimationManager, ElementRef) {
					this._animationManager = AnimationManager;
					this._element = ElementRef.nativeElement;
					this.onComplete = new ng.core.EventEmitter();
					this._currentAnimation = null;
					this._mutationObserver = null;
					this._creationCompleteTimeout = null;
					this._enableMutationObserver();
				}
			],
			ngOnInit: function () {
				if (this._animationManager.enterAnimation != null) {
					this._element.style["-webkit-animation-duration"] = this._animationManager.duration + "ms";
					this._element.style.visibility = "hidden";
				} else {
					this.onComplete.emit();
				}
			},
			ngOnChanges: function (changes) {
				if (changes.hasOwnProperty("animation")) {
					this._setAnimation(changes.animation.currentValue);
				}
			},
			ngonDestroy: function () {
				this._disableMutationObserver();
			},
			_disableMutationObserver: function () {
				if (this._mutationObserver !== null) {
					this._mutationObserver.disconnect();
					this._mutationObserver = null;
				}
			},
			_enableMutationObserver: function () {
				this._disableMutationObserver();
				this._mutationObserver = new MutationObserver(() => {
					if (this._creationCompleteTimeout !== null) {
						clearTimeout(this._creationCompleteTimeout);
					}
					this._creationCompleteTimeout = setTimeout(() => {
						this._disableMutationObserver();
						this._setAnimation(this._animationManager.enterAnimation);
					}, 100);
				});
				const config = {
					childList: true,
					attributes: false,
					characterData: false,
					subtree: true
				};
				this._mutationObserver.observe(this._element, config);
			},
			_setAnimation: function (animation) {
				if (animation != null && this._currentAnimation !== animation) {
					this._currentAnimation = animation;
					this._element.style.visibility = "initial";
					this._element.className = "";
					this._element.classList.add("animated");
					this._element.classList.add(this._currentAnimation);
					setTimeout(() => {
						this.onComplete.emit();
					}, this._animationManager.duration);
				}
			}
		});
	});	