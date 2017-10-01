define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function BulmaComboboxComponent() {
				this.active = false;
				this.right = false;
				this.provider = [];
				this.iconType = "fa";
				this.change = new ng.core.EventEmitter();
				this.selected = null;
				this.selectedChange = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-combobox-component", {
					inputs: ["selected", "provider", "right", "iconType"],
					outputs: ["change", "selectedChange"]
				}))
			],
			functions: {
				trackBy: function (item) {
					return item.data;
				},
				onClick: function (item) {
					this.selected = item;
					this.selectedChange.emit(this.selected);
					this.change.emit(this.selected);
				}
			}
		});
	}
);