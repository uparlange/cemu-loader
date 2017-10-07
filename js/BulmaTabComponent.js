define(["AppUtils", "AbstractEventManager", "KeyboardManager"],
	function (AppUtils, AbstractEventManager, KeyboardManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function BulmaTabComponent(ElementRef, KeyboardManager) {
				AbstractEventManager.call(this);
				this.id = null;
				this.active = false;
				this._elementRef = ElementRef.nativeElement;
				this._keyboardManager = KeyboardManager;
				this._keyboardManagerSubscriber = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-tab-component", {
					inputs: ["id", "active"]
				}))
			],
			parameters: [
				[ng.core.ElementRef], [KeyboardManager]
			],
			functions: {
				ngOnInit: function () {
					this._elementRef.setAttribute("tabindex", 0);
					this._keyboardManagerSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						if (document.activeElement === this._elementRef && event.code === "Space") {
							this.onClick();
						}
					});
				},
				ngOnDestroy: function () {
					this._keyboardManagerSubscriber.unsubscribe();
				},
				onClick: function () {
					this.emit("tabClick", { id: this.id });
				}
			}
		});
	}
);