define(["AppUtils", "CommonModule", "AppView", "AppModel", "CemuManager",
	"AnimationManager", "RouterManager", "ApplicationManager", "Shell", "VersionManager",
	"WmicManager", "TranslateManager", "GameHelper", "ItemHelper", "UserConfigHelper",
	"RendererHelper", "ImageManager"],
	function (AppUtils, CommonModule, AppView, AppModel, CemuManager,
		AnimationManager, RouterManager, ApplicationManager, Shell, VersionManager,
		WmicManager, TranslateManager, GameHelper, ItemHelper, UserConfigHelper,
		RendererHelper, ImageManager) {
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
						TranslateManager,
						GameHelper,
						ItemHelper,
						UserConfigHelper,
						RendererHelper,
						ImageManager
					],
					bootstrap: [
						AppView
					]
				})
			]
		}));
	}
);