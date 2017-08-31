define(["AppUtils", "AbstractRendererComponent"],
	function (AppUtils, AbstractRendererComponent) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function TileRendererComponent() {
				AbstractRendererComponent.call(this);
			},
			annotations: [
				new ng.core.Component(AppUtils.getRendererComponentConfiguration("tile-renderer-component"))
			]
		});
	}
);