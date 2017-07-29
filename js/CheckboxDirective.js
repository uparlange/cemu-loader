define(["AppUtils"],
	function (AppUtils) {
		const conf = AppUtils.getDirectiveConfiguration(".checkbox", {
			inputs: ["ngModel"]
		});
		return ng.core.Directive(conf).Class({
			constructor: [ng.core.ElementRef,
				function CheckboxComponent(ElementRef) {
					this._element = ElementRef.nativeElement;
				}
			],
			ngOnInit: function () {
				this._element.classList.add("fa");
			},
			ngOnChanges:function(changes) {
				if(changes.hasOwnProperty("ngModel")) {
					this._element.classList.remove("fa-square-o");
					this._element.classList.remove("fa-check-square-o");
					this._element.classList.add(changes.ngModel.currentValue ? "fa-check-square-o" : "fa-square-o");
				}
			}
		});
	});	