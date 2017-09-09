define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function CheckboxComponent() {
				this.id = null;
				this.selected = false;
				this.selectedChange = new ng.core.EventEmitter();
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("checkbox-component", {
					inputs: ["id", "selected"],
					outputs: ["selectedChange"]
				}))
			],
			functions: [
				function onChange() {
					this.selectedChange.emit(this.selected);
				}
			]
		});
	}
);	