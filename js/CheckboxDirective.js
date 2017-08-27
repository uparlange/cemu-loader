define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function CheckboxDirective(ElementRef) {
				this._element = ElementRef.nativeElement;
			},
			annotations: [
				new ng.core.Directive({
					selector: ".checkbox",
					inputs: ["ngModel"]
				})
			],
			parameters: [
				[ng.core.ElementRef]
			],
			functions: [
				function ngOnInit() {
					this._element.classList.add("fa");
				},
				function ngOnChanges(changes) {
					if (changes.hasOwnProperty("ngModel")) {
						this._element.classList.remove("fa-square-o");
						this._element.classList.remove("fa-check-square-o");
						this._element.classList.add(changes.ngModel.currentValue ? "fa-check-square-o" : "fa-square-o");
					}
				}
			]
		});
	}
);	