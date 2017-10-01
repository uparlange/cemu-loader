define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function ListRendererView(RendererHelper) {
				AbstractRendererComponent.call(this, RendererHelper);
				this.selected = null;
			},
			parameters: [
				[RendererHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("list-renderer-view"))
			],
			functions: {
				onAction: function (game, option) {
					this.helper.executeGameOption(game, option);
					this.selected = {};
				}
			}
		});
	}
);