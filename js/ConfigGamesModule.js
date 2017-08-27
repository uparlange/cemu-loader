define(["Apputils", "CommonModule", "ConfigGamesView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, ConfigGamesView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function ConfigGamesModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ConfigGamesView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						ConfigGamesView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);