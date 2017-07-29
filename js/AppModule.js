define(["CommonModule", "AppView", "AppUtils", "AppModel", "CemuManager", "AnimationManager", "RouterManager", "ApplicationManager", "Shell", "VersionManager"],
	function (CommonModule, AppView, AppUtils, AppModel, CemuManager, AnimationManager, RouterManager, ApplicationManager, Shell, VersionManager) {
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
					Shell,
					AppModel,
					CemuManager,
					AnimationManager,
					RouterManager,
					ApplicationManager,
					VersionManager
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