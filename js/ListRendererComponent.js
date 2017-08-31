define(["AppUtils", "AbstractRendererComponent"],
	function (AppUtils, AbstractRendererComponent) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function ListRendererComponent() {
				AbstractRendererComponent.call(this);
			},
			annotations: [
				new ng.core.Component(AppUtils.getRendererComponentConfiguration("list-renderer-component"))
			],
		});
	}
);