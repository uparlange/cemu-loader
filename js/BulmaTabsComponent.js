define(["AppUtils", "BulmaTabComponent"],
	function (AppUtils, BulmaTabComponent) {
		return AppUtils.getClass({
			constructor: function BulmaTabsComponent() {
				this.selected = null;
				this.selectedChange = new ng.core.EventEmitter();
				this.change = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-tabs-component", {
					inputs: ["selected"],
					outputs: ["change", "selectedChange"],
					queries: {
						tabs: new ng.core.ContentChildren(BulmaTabComponent)
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
				function _initListeners() {
					this.tabs.forEach((tab) => {
						tab.on("tabClick").subscribe((event) => {
							if (event.id !== this.selected) {
								this.selected = event.id;
								this.selectedChange.emit(this.selected);
								this.change.emit(this.selected);
								this._refreshSelection();
							}
						});
					});
				},
				function _refreshSelection() {
					if (this.tabs) {
						this.tabs.forEach((tab) => {
							tab.active = (tab.id === this.selected);
						});
					}
				}
			]
		});
	}
);