define(["AppUtils", "CommonModule", "AppView", "AppModel", "CemuManager",
	"AnimationManager", "RouterManager", "ApplicationManager", "Shell", "VersionManager",
	"WmicManager", "TranslateManager"],
	function (AppUtils, CommonModule, AppView, AppModel, CemuManager,
		AnimationManager, RouterManager, ApplicationManager, Shell, VersionManager,
		WmicManager, TranslateManager) {
		ng.core.enableProdMode();
		ng.platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(AppUtils.getClass({
			constructor: function AppModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.platformBrowser.BrowserModule,
						ng.router.RouterModule.forRoot([
							{ path: "", redirectTo: "list", pathMatch: "full" },
							{ path: "list", loadChildren: AppUtils.getLazyModuleName("ListModule") },
							{ path: "config", loadChildren: AppUtils.getLazyModuleName("ConfigModule") },
							{ path: "resources", loadChildren: AppUtils.getLazyModuleName("ResourcesModule") }
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
						VersionManager,
						WmicManager,
						TranslateManager
					],
					bootstrap: [
						AppView
					]
				})
			]
		}));
	}
);