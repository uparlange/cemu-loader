define(["RouterManager", "ApplicationManager", "AnimationManager", "CemuManager", "VersionManager",
	"WmicManager"],
	function (RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
		WmicManager) {
		return ng.core.Class({
			constructor: [RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				WmicManager,
				function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
					WmicManager) {
					this._managers = [];
					this._managers.push(RouterManager);
					this._managers.push(ApplicationManager);
					this._managers.push(AnimationManager);
					this._managers.push(CemuManager);
					this._managers.push(VersionManager);
					this._managers.push(WmicManager)
				}
			],
			init: function () {
				this._managers.forEach(function (manager) {
					manager.init();
				});
			}
		});
	});