define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function BulmaComboboxComponent() {
				this.active = false;
				this.selected = false;
				this.provider = [];
				this.change = new ng.core.EventEmitter();
				this.selectedChange = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("bulma-combobox-component", {
					inputs: ["selected", "provider"],
					outputs: ["change", "selectedChange"]
				}))
			],
			functions: [
				function trackBy(item) {
					return item.data;
				},
				function onClick(item) {
					this.selected = item;
					this.selectedChange.emit(this.selected);
					this.change.emit(this.selected);
				}
			]
		});
	}
);