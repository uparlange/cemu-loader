define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function ListRendererView(RendererHelper) {
				AbstractRendererComponent.call(this, RendererHelper);
			},
			parameters: [
				[RendererHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("list-renderer-view"))
			]
		});
	}
);