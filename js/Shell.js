define(["AppUtils", "RouterManager", "ApplicationManager", "AnimationManager", "CemuManager",
	"VersionManager", "WmicManager", "TranslateManager", "ImageManager", "KeyboardManager"],
	function (AppUtils, RouterManager, ApplicationManager, AnimationManager, CemuManager,
		VersionManager, WmicManager, TranslateManager, ImageManager, KeyboardManager) {
		return AppUtils.getClass({
			constructor: function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				WmicManager, TranslateManager, ImageManager, KeyboardManager) {
				this._managers = [];
				this._managers.push(RouterManager);
				this._managers.push(ApplicationManager);
				this._managers.push(AnimationManager);
				this._managers.push(CemuManager);
				this._managers.push(VersionManager);
				this._managers.push(WmicManager);
				this._managers.push(TranslateManager);
				this._managers.push(ImageManager);
				this._managers.push(KeyboardManager);
			},
			parameters: [
				[RouterManager], [ApplicationManager], [AnimationManager], [CemuManager], [VersionManager],
				[WmicManager], [TranslateManager], [ImageManager], [KeyboardManager]
			],
			functions: {
				init: function () {
					this._managers.forEach(function (manager) {
						manager.init();
					});
				}
			}
		});
	}
);