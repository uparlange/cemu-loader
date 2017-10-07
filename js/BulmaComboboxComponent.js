define(["AppUtils", "EventBusManager"],
	function (AppUtils, EventBusManager) {
		return AppUtils.getClass({
			constructor: function BulmaComboboxComponent(EventBusManager) {
				this.active = false;
				this.right = false;
				this.provider = [];
				this.iconType = "fa";
				this.change = new ng.core.EventEmitter();
				this.selected = null;
				this.selectedChange = new ng.core.EventEmitter();
				this._id = AppUtils.getUID();
				this._eventBusManager = EventBusManager;
			},
			parameters: [
				[EventBusManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-combobox-component", {
					inputs: ["selected", "provider", "right", "iconType"],
					outputs: ["change", "selectedChange"]
				}))
			],
			functions: {
				ngOnInit: function () {
					this._eventBusManagerSubscriber = this._eventBusManager.on("BulmaComboboxComponentClick").subscribe((event) => {
						if (event.id !== this._id) {
							this.active = false;
						}
					});
				},
				ngOnDestroy: function () {
					this._eventBusManagerSubscriber.unsubscribe();
				},
				trackBy: function (item) {
					return item.data;
				},
				onButtonClick: function () {
					this._eventBusManager.emit("BulmaComboboxComponentClick", { id: this._id });
				},
				onItemClick: function (item) {
					this.selected = item;
					this.selectedChange.emit(this.selected);
					this.change.emit(this.selected);
				}
			}
		});
	}
);