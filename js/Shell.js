define(["AppUtils", "RouterManager", "ApplicationManager", "AnimationManager", "CemuManager",
	"VersionManager", "WmicManager", "TranslateManager", "ImageManager", "KeyboardManager",
	"EventBusManager"],
	function (AppUtils, RouterManager, ApplicationManager, AnimationManager, CemuManager,
		VersionManager, WmicManager, TranslateManager, ImageManager, KeyboardManager,
		EventBusManager) {
		return AppUtils.getClass({
			constructor: function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				WmicManager, TranslateManager, ImageManager, KeyboardManager, EventBusManager) {
				this._routerManager = RouterManager;
				this._applicationManager = ApplicationManager;
				this._animationManager = AnimationManager;
				this._cemuManager = CemuManager;
				this._versionManager = VersionManager;
				this._wmicManager = WmicManager;
				this._translateManager = TranslateManager;
				this._imageManager = ImageManager;
				this._keyboardManager = KeyboardManager;
				this._eventBusManager = EventBusManager;
			},
			parameters: [
				[RouterManager], [ApplicationManager], [AnimationManager], [CemuManager], [VersionManager],
				[WmicManager], [TranslateManager], [ImageManager], [KeyboardManager], [EventBusManager]
			],
			functions: {
				init: function (config) {
					this._routerManager.init();
					this._applicationManager.init();
					this._animationManager.init();
					this._cemuManager.init();
					this._versionManager.init();
					this._wmicManager.init();
					this._translateManager.init({
						propertyFilePattern: "data/locales/{locale}/properties.json",
						language: config.language
					});
					this._imageManager.init();
					this._keyboardManager.init();
					this._eventBusManager.init();
				}
			}
		});
	}
);