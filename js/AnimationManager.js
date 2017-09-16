define(["AppUtils", "RouterManager"],
	function (AppUtils, RouterManager) {
		return AppUtils.getClass({
			constructor: function AnimationManager(RouterManager) {
				this._routerManager = RouterManager;
				this.enterAnimation = null;
				this.leaveAnimation = null;
				this.transitions = [];
				this.duration = 0;
			},
			parameters: [
				[RouterManager]
			],
			functions: [
				function init() {
					this._routerManager.on("NAVIGATION_START").subscribe((event) => {
						this.enterAnimation = null;
						this.leaveAnimation = null;
						this.transitions.forEach((transition) => {
							if ((event.fromUrl.indexOf(transition.from) !== -1) && (event.toUrl.indexOf(transition.to) !== -1)) {
								this.enterAnimation = transition.enterAnimation;
								this.leaveAnimation = transition.leaveAnimation;
							} else if (transition.reverse && (event.fromUrl.indexOf(transition.to) !== -1) && (event.toUrl.indexOf(transition.from) !== -1)) {
								this.enterAnimation = this._getReverseAnimation(transition.enterAnimation);
								this.leaveAnimation = this._getReverseAnimation(transition.leaveAnimation);
							}
						});
					});
					const config = AppUtils.getAnimationsFile();
					this.transitions = config.transitions;
					this.duration = config.duration;
				},
				function _getReverseAnimation(animation) {
					let reverseAnimation = "";
					if (animation.indexOf("Left") !== -1) {
						reverseAnimation = animation.replace("Left", "Right");
					} else if (animation.indexOf("Right") !== -1) {
						reverseAnimation = animation.replace("Right", "Left");
					} else if (animation.indexOf("Down") !== -1) {
						reverseAnimation = animation.replace("Down", "Up");
					} else if (animation.indexOf("Up") !== -1) {
						reverseAnimation = animation.replace("Up", "Down");
					}
					return reverseAnimation;
				}
			]
		});
	}
);