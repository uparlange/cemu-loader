define(["AppUtils", "RouterManager", "ApplicationManager", "AnimationManager", "CemuManager",
	"VersionManager", "WmicManager", "TranslateManager", "ImageManager"],
	function (AppUtils, RouterManager, ApplicationManager, AnimationManager, CemuManager,
		VersionManager, WmicManager, TranslateManager, ImageManager) {
		return AppUtils.getClass({
			constructor: function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				WmicManager, TranslateManager, ImageManager) {
				this._managers = [];
				this._managers.push(RouterManager);
				this._managers.push(ApplicationManager);
				this._managers.push(AnimationManager);
				this._managers.push(CemuManager);
				this._managers.push(VersionManager);
				this._managers.push(WmicManager);
				this._managers.push(TranslateManager);
				this._managers.push(ImageManager);
			},
			parameters: [
				[RouterManager], [ApplicationManager], [AnimationManager], [CemuManager], [VersionManager],
				[WmicManager], [TranslateManager], [ImageManager]
			],
			functions: [
				function init() {
					this._managers.forEach(function (manager) {
						manager.init();
					});
				}
			]
		});
	}
);