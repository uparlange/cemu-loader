define(["AppUtils", "BulmaTabComponent"],
	function (AppUtils, BulmaTabComponent) {
		return AppUtils.getClass({
			constructor: function BulmaTabsComponent() {
				this.selected = null;
				this.selectedChange = new ng.core.EventEmitter();
				this.change = new ng.core.EventEmitter();
				this._tabsEventsSubscribers = [];
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
				ngOnDestroy: function () {
					this._tabsEventsSubscribers.forEach((subscriber) => {
						subscriber.unsubscribe();
					});
				},
				_initListeners: function () {
					this.tabs.forEach((tab) => {
						const subscriber = tab.on("tabClick").subscribe((event) => {
							if (event.id !== this.selected) {
								this.selected = event.id;
								this.selectedChange.emit(this.selected);
								this.change.emit(this.selected);
								this._refreshSelection();
							}
						});
						this._tabsEventsSubscribers.push(subscriber);
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