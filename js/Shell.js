define(["RouterManager", "ApplicationManager", "AnimationManager", "CemuManager", "VersionManager"],
	function (RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager) {
		return ng.core.Class({
			constructor: [RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager,
				function Shell(RouterManager, ApplicationManager, AnimationManager, CemuManager, VersionManager) {
					this._managers = [];
					this._managers.push(RouterManager);
					this._managers.push(ApplicationManager);
					this._managers.push(AnimationManager);
					this._managers.push(CemuManager);
					this._managers.push(VersionManager);
				}
			],
			init: function () {
				this._managers.forEach(function (manager) {
					manager.init();
				});
			}
		});
	});