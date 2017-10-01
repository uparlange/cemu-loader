define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function AnimatedDirective(ElementRef) {
				this._element = ElementRef.nativeElement;
				this.onComplete = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Directive({
					selector: "[animated]",
					inputs: ["animation", "duration"],
					outputs: ["onComplete"]
				})
			],
			parameters: [
				[ng.core.ElementRef]
			],
			functions: {
				ngOnInit: function () {
					this._element.addEventListener("webkitAnimationEnd", () => {
						this.onComplete.emit();
					});
				},
				ngOnChanges: function () {
					this._checkAnimation();
				},
				_checkAnimation: function () {
					if (this.animation != null && this.duration != null) {
						this._element.style.visibility = "initial";
						this._element.style["-webkit-animation-duration"] = this.duration + "ms";
						this._element.classList.add("animated");
						this._element.classList.add(this.animation);
					}
				}
			}
		});
	}
);	