define(["AppUtils", "KeyboardManager"],
	function (AppUtils, KeyboardManager) {
		return AppUtils.getClass({
			constructor: function CheckboxComponent(ElementRef, KeyboardManager) {
				this.id = null;
				this.selected = false;
				this.selectedChange = new ng.core.EventEmitter();
				this._elementRef = ElementRef.nativeElement;
				this._keyboardManager = KeyboardManager;
				this._keydownSubscriber = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("checkbox-component", {
					inputs: ["id", "selected"],
					outputs: ["selectedChange"]
				}))
			],
			parameters: [
				[ng.core.ElementRef], [KeyboardManager]
			],
			functions: {
				ngOnInit: function () {
					this._elementRef.setAttribute("tabindex", 0);
					this._keydownSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						if (document.activeElement === this._elementRef && event.code === "Space") {
							this._toggle();
						}
					});
				},
				onChange: function () {
					this.selectedChange.emit(this.selected);
				},
				ngOnDestroy: function () {
					this._keydownSubscriber.unsubscribe();
				},
				_toggle: function () {
					this.selected = !this.selected;
					this.onChange();
				}
			}
		});
	}
);	