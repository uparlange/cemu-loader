define(["AppUtils", "CemuManager", "AnimationManager", "RouterManager", "ApplicationManager",
	"Shell", "VersionManager", "WmicManager", "TranslateManager", "GameHelper",
	"ItemHelper", "UserConfigHelper", "RendererHelper", "ImageManager", "EventBusManager",
	"KeyboardManager"],
	function (AppUtils, CemuManager, AnimationManager, RouterManager, ApplicationManager,
		Shell, VersionManager, WmicManager, TranslateManager, GameHelper,
		ItemHelper, UserConfigHelper, RendererHelper, ImageManager, EventBusManager,
		KeyboardManager) {
		return AppUtils.getClass({
			constructor: function GlobalModule() {

			},
			annotations: [
				new ng.core.NgModule({
					providers: [
						Shell,
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
						ImageManager,
						EventBusManager,
						KeyboardManager
					]
				})
			]
		});
	}
);