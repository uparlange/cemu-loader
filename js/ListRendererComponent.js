define(["AppUtils", "AbstractRendererComponent", "GameHelper"],
	function (AppUtils, AbstractRendererComponent, GameHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function ListRendererComponent(GameHelper) {
				AbstractRendererComponent.call(this, GameHelper);
			},
			parameters: [
				[GameHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getRendererComponentConfiguration("list-renderer-component"))
			],
		});
	}
);