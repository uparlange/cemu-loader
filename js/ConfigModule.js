define(["AppUtils", "CommonModule", "ConfigView"],
	function (AppUtils, CommonModule, ConfigView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", redirectTo: "params", pathMatch: "full" },
						{ path: "params", loadChildren: AppUtils.getModuleName("ConfigParamsModule") },
						{ path: "games", loadChildren: AppUtils.getModuleName("ConfigGamesModule") }
					])
				],
				declarations: [
					ConfigView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function ConfigModule() {

					}
				]
			})
		};
	});