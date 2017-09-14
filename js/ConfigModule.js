define(["AppUtils", "CommonModule"],
	function (AppUtils, CommonModule) {
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
					]
				})
			]
		});
	}
);