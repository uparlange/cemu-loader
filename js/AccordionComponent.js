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
			functions: [
				function ngAfterContentInit() {
					this._initListeners();
					this._refreshSelection();
				},
				function ngOnChanges(changes) {
					if (changes.hasOwnProperty("selected")) {
						this._refreshSelection();
					}
				},
				function ngOnDestroy() {
					this._panelsEventsSubscribers.forEach((subscriber) => {
						subscriber.unsubscribe();
					});
				},
				function _initListeners() {
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
				function _refreshSelection() {
					if (this.panels) {
						this.panels.forEach((panel) => {
							panel.header.icon = (panel.id === this.selected) ? "fa-minus-square-o" : "fa-plus-square-o";
							panel.content.visible = (panel.id === this.selected);
						});
					}
				}
			]
		});
	}
);