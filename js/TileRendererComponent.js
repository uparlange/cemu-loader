define(["AppUtils", "AbstractRendererComponent", "GameHelper"],
	function (AppUtils, AbstractRendererComponent, GameHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function TileRendererComponent(GameHelper) {
				AbstractRendererComponent.call(this, GameHelper);
			},
			parameters: [
				[GameHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getRendererComponentConfiguration("tile-renderer-component"))
			],
		});
	}
);