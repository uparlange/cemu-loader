define(["AppUtils", "CommonModule", "GlobalModule", "AppView", "AppModel"],
	function (AppUtils, CommonModule, GlobalModule, AppView, AppModel) {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppUtils.getClass({
			constructor: function AppModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						GlobalModule,
						ng.platformBrowser.BrowserModule,
						ng.router.RouterModule.forRoot([
							{ path: "list", loadChildren: AppUtils.getLazyModuleName("ListModule") },
							{ path: "config", loadChildren: AppUtils.getLazyModuleName("ConfigModule") },
							{ path: "resources", loadChildren: AppUtils.getLazyModuleName("ResourcesModule") }
						])
					],
					declarations: [
						AppView
					],
					providers: [
						AppModel
					],
					bootstrap: [
						AppView
					]
				})
			]
		}));
	}
);