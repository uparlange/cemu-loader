define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("list");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, CemuManager,
				function ListView(AppModel, CemuManager) {
					this.model = AppModel;
					this._cemuManager = CemuManager;
				}
			],
			ngOnInit: function () {
				this.model.init();
			},
			launchGame: function (game) {
				this._cemuManager.launchGame(game);
			}
		})
	});