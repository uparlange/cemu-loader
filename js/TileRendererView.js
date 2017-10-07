define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function TileRendererView(RendererHelper) {
				AbstractRendererComponent.call(this, RendererHelper);
				this.selected = null;
			},
			parameters: [
				[RendererHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("tile-renderer-view"))
			],
			functions: {
				getComboPosition: function (index) {
					return ((index % 4) !== 0);
				},
				onAction: function (game, option) {
					this.helper.executeGameOption(game, option);
					this.selected = {};
				}
			}
		});
	}
);