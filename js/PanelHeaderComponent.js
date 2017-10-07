define(["AppUtils", "AbstractEventManager", "ImageComponent", "KeyboardManager"],
	function (AppUtils, AbstractEventManager, ImageComponent, KeyboardManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function PanelHeaderComponent(ElementRef, KeyboardManager) {
				AbstractEventManager.call(this);
				this.icon = null;
				this.iconType = "fa";
				this._elementRef = ElementRef.nativeElement;
				this._keyboardManager = KeyboardManager;
				this._keyboardManagerSubscriber = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("panel-header-component", {
					inputs: ["icon"]
				}))
			],
			parameters: [
				[ng.core.ElementRef], [KeyboardManager]
			],
			functions: {
				ngOnInit: function () {
					this._keyboardManagerSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						if (document.activeElement === this._elementRef && event.code === "Space") {
							this.onClick();
						}
					});
				},
				ngOnDestroy: function () {
					this._keyboardManagerSubscriber.unsubscribe();
				},
				setTabIndex: function (index) {
					this._elementRef.setAttribute("tabindex", index);
				},
				onClick: function () {
					this.emit("headerClick");
				}
			}
		});
	}
);