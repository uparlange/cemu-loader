define(["AppUtils", "PanelComponent"],
	function (AppUtils, PanelComponent) {
		return AppUtils.getClass({
			constructor: function AccordionComponent() {
				this.selected = null;
				this.change = new ng.core.EventEmitter();
				this.selectedChange = new ng.core.EventEmitter();
				this._panelsEventsSubscribers = [];
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("accordion-component", {
					inputs: ["selected"],
					outputs: ["change", "selectedChange"],
					queries: {
						panels: new ng.core.ContentChildren(PanelComponent)
					}
				}))
			],
			functions: {
				ngAfterContentInit: function () {
					this._initListeners();
					this._refreshSelection();
				},
				ngOnChanges: function (changes) {
					if (changes.hasOwnProperty("selected")) {
						this._refreshSelection();
					}
				},
				ngOnDestroy: function () {
					this._panelsEventsSubscribers.forEach((subscriber) => {
						subscriber.unsubscribe();
					});
				},
				_initListeners: function () {
					this.panels.forEach((panel) => {
						const subscriber = panel.on("panelHeaderClick").subscribe((event) => {
							if (event.id !== this.selected) {
								this.selected = event.id;
								this.selectedChange.emit(this.selected);
								this.change.emit(this.selected);
								this._refreshSelection();
							}
						});
						this._panelsEventsSubscribers.push(subscriber);
					});
				},
				_refreshSelection: function () {
					if (this.panels) {
						this.panels.forEach((panel) => {
							panel.header.setTabIndex(0);
							panel.header.icon = (panel.id === this.selected) ? "fa-minus-square-o" : "fa-plus-square-o";
							panel.content.visible = (panel.id === this.selected);
						});
					}
				}
			}
		});
	}
);