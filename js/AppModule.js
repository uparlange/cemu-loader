define(["CommonModule", "AppView", "AppUtils", "AppModel", "CemuManager", "AnimationManager", "RouterManager", "ApplicationManager"],
	function (CommonModule, AppView, AppUtils, AppModel, CemuManager, AnimationManager, RouterManager, ApplicationManager) {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
			ng.core.NgModule({
				imports: [
					CommonModule,
					ng.platformBrowser.BrowserModule,
					ng.router.RouterModule.forRoot([
						{ path: "", redirectTo: "list", pathMatch: "full" },
						{ path: "list", loadChildren: AppUtils.getModuleName("ListModule") },
						{ path: "config", loadChildren: AppUtils.getModuleName("ConfigModule") },
						{ path: "resources", loadChildren: AppUtils.getModuleName("ResourcesModule") }
					])
				],
				declarations: [
					AppView
				],
				providers: [
					AppModel,
					CemuManager,
					AnimationManager,
					RouterManager,
					ApplicationManager
				],
				bootstrap: [
					AppView
				]
			}).Class({
				constructor: [
					function AppModule() {

					}
				]
			})
		);
	});