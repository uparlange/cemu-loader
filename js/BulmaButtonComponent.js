define(["AppUtils", "KeyboardManager"],
	function (AppUtils, KeyboardManager) {
		return AppUtils.getClass({
			constructor: function BulmaButtonComponent(ElementRef, KeyboardManager) {
				this.enabled = true;
				this.title = null;
				this.label = null;
				this.icon = null;
				this.iconType = "fa";
				this._elementRef = ElementRef.nativeElement;
				this._keyboardManager = KeyboardManager;
				this._keyboardManagerSubscriber = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-button-component", {
					inputs: ["enabled", "title", "icon", "iconType", "label"]
				}))
			],
			parameters: [
				[ng.core.ElementRef], [KeyboardManager]
			],
			functions: {
				ngOnInit: function () {
					this._keyboardManagerSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						if (document.activeElement === this._elementRef && event.code === "Space") {
							this._elementRef.dispatchEvent(new Event("click"));
						}
					});
					this._initUpdate();
				},
				ngOnChanges: function (changes) {
					if (changes.hasOwnProperty("enabled")) {
						this._initUpdate();
					}
				},
				ngOnDestroy: function () {
					this._keyboardManagerSubscriber.unsubscribe();
				},
				_initUpdate: function () {
					// tab index
					this._elementRef.setAttribute("tabindex", this.enabled ? 0 : -1);
					// disabed
					const a = this._elementRef.getElementsByTagName("a")[0];
					if (this.enabled) {
						a.removeAttribute("disabled");
					} else {
						a.setAttribute("disabled", "disabled");
					}
				}
			}
		});
	}
);