define(["CommonModule", "AppView", "AppUtils", "AppModel", "RouterManager", "CemuManager"],
	function (CommonModule, AppView, AppUtils, AppModel, RouterManager, CemuManager) {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(
			ng.core.NgModule({
				imports: [
					CommonModule,
					ng.platformBrowser.BrowserModule,
					ng.router.RouterModule.forRoot([
						{ path: "", redirectTo: "list", pathMatch: "full" },
						{ path: "list", loadChildren: AppUtils.getModuleName("ListModule") },
						{ path: "config", loadChildren: AppUtils.getModuleName("ConfigModule") }
					], { useHash: true })
				],
				declarations: [
					AppView
				],
				providers: [
					AppModel,
					RouterManager,
					CemuManager
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