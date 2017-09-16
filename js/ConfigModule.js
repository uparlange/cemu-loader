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
							{ path: "params", loadChildren: AppUtils.getLazyModuleName("ConfigParamsModule") },
							{ path: "games", loadChildren: AppUtils.getLazyModuleName("ConfigGamesModule") }
						])
					]
				})
			]
		});
	}
);