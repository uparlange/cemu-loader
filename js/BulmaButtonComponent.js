define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function BulmaButtonComponent(ElementRef) {
				this.enabled = true;
				this.title = null;
				this.label = null;
				this.icon = null;
				this._elementRef = ElementRef.nativeElement;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-button-component", {
					inputs: ["enabled", "title", "icon", "label"]
				}))
			],
			parameters: [
				[ng.core.ElementRef]
			],
			functions: [
				function onClick(event) {
					if (!this.enabled) {
						event.stopPropagation();
						event.preventDefault();
						return false;
					}
				},
				function ngOnChanges(changes) {
					if (changes.hasOwnProperty("enabled")) {
						const a = this._elementRef.getElementsByTagName("a")[0];
						if (changes.enabled.currentValue === true) {
							a.removeAttribute("disabled");
						} else {
							a.setAttribute("disabled", "disabled");
						}
					}
				}
			]
		});
	}
);