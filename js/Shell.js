define(["AppUtils", "RouterManager", "ApplicationManager", "AnimationManager", "CemuManager",
	"VersionManager", "WmicManager"],
	function (AppUtils, RouterManager, ApplicationManager, AnimationManager, CemuManager,
		VersionManager, WmicManager) {
		return AppUtils.getClass({
			constructor: function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				WmicManager) {
				this._managers = [];
				this._managers.push(RouterManager);
				this._managers.push(ApplicationManager);
				this._managers.push(AnimationManager);
				this._managers.push(CemuManager);
				this._managers.push(VersionManager);
				this._managers.push(WmicManager)
			},
			parameters: [
				[RouterManager], [ApplicationManager], [AnimationManager], [CemuManager], [VersionManager], [WmicManager]
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