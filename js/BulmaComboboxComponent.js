define(["AppUtils", "EventBusManager", "KeyboardManager"],
	function (AppUtils, EventBusManager, KeyboardManager) {
		return AppUtils.getClass({
			constructor: function BulmaComboboxComponent(EventBusManager, KeyboardManager) {
				this.active = false;
				this.right = false;
				this.provider = [];
				this.iconType = "fa";
				this.change = new ng.core.EventEmitter();
				this.selected = null;
				this.selectedChange = new ng.core.EventEmitter();
				this._id = AppUtils.getUID();
				this._eventBusManager = EventBusManager;
				this._eventBusManagerSubscriber = null;
				this._keyboardManager = KeyboardManager;
				this._keyboardManagerSubscriber = null;
			},
			parameters: [
				[EventBusManager], [KeyboardManager]
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
					this._keyboardManagerSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						if (this.active) {
							switch (event.code) {
								case "ArrowDown": this._selectNextItem(); break;
								case "ArrowUp": this._selectPreviousItem(); break;
							}
						}
					});
				},
				ngOnDestroy: function () {
					this._eventBusManagerSubscriber.unsubscribe();
					this._keyboardManagerSubscriber.unsubscribe();
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
				},
				_selectNextItem: function () {
					const index = this.provider.indexOf(this.selected);
					if (index < (this.provider.length - 1)) {
						this.onItemClick(this.provider[index + 1]);
					}
				},
				_selectPreviousItem: function () {
					const index = this.provider.indexOf(this.selected);
					if (index > 0) {
						this.onItemClick(this.provider[index - 1]);
					}
				}
			}
		});
	}
);