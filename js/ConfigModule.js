define(["AppUtils", "CommonModule", "ConfigView"],
	function (AppUtils, CommonModule, ConfigView) {
		return AppUtils.getLazyModuleClass({
			constructor: function ConfigModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", redirectTo: "params", pathMatch: "full" },
							{ path: "params", loadChildren: AppUtils.getLazyModuleName("ConfigParamsModule") },
							{ path: "games", loadChildren: AppUtils.getLazyModuleName("ConfigGamesModule") }
						])
					],
					declarations: [
						ConfigView
					],
					providers: [

					]
				})
			]
		});
	}
);