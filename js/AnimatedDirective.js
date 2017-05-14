define(["AppUtils"],
	function (AppUtils) {
		const conf = AppUtils.getDirectiveConfiguration("[animated]", {
			inputs: ["animation", "duration"],
			outputs: ["onComplete"]
		});
		return ng.core.Directive(conf).Class({
			constructor: [ng.core.ElementRef,
				function AnimatedDirective(ElementRef) {
					this._element = ElementRef.nativeElement;
					this.onComplete = new ng.core.EventEmitter();
				}
			],
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
					this._element.className = "";
					this._element.classList.add("animated");
					this._element.classList.add(this.animation);
				}
			}
		});
	});	