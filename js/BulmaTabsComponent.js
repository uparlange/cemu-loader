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
				_initListeners: function () {
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
				_refreshSelection: function () {
					if (this.tabs) {
						this.tabs.forEach((tab) => {
							tab.active = (tab.id === this.selected);
						});
					}
				}
			}
		});
	}
);