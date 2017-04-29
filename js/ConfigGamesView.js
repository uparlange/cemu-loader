define(["AppUtils", "AppModel"],
	function (AppUtils, AppModel) {
		const conf = AppUtils.getComponentConfiguration("config-games");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, ng.router.Router,
				function ConfigGamesView(AppModel, Router) {
					this.model = AppModel;
					this._router = Router;
					this.filterValue = null;
				}
			],
			select: function (game) {
				if (this.model.currentGame != null) {
					this.model.currentGame.id = game.id;
					this.model.currentGame.name = game.name;
					this.model.currentGame.image = game.image;
				}
				this._showParams();
			},
			deleteFilter: function () {
				this.filterValue = null;
			},
			cancel: function () {
				this._showParams();
			},
			_showParams: function () {
				this._router.navigate(["/config/params"]);
			}
		})
	});