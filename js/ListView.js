define(["AppUtils", "AppModel", "CemuManager", "TranslateManager"],
	function (AppUtils, AppModel, CemuManager, TranslateManager) {
		return AppUtils.getClass({
			constructor: function ListView(AppModel, CemuManager, TranslateManager) {
				this.model = AppModel;
				this._cemuManager = CemuManager;
				this._translateManager = TranslateManager;
				this._onContextmenuHandler = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("list-view"))
			],
			parameters: [
				[AppModel], [CemuManager], [TranslateManager]
			],
			functions: [
				function ngOnInit() {
					this._onContextmenuHandler = (evt) => {
						evt.preventDefault();
						this._displayRightClickMenu(evt);
						return false;
					};
					document.body.addEventListener("contextmenu", this._onContextmenuHandler);
				},
				function ngOnDestroy() {
					document.body.removeEventListener("contextmenu", this._onContextmenuHandler);
				},
				function launchGame(game) {
					this._cemuManager.launchGame(game);
				},
				function _displayRightClickMenu(evt) {
					this._translateManager.getValues(["L10N_DESCRIPTION"]).subscribe((translations) => {
						const game = this._getGameByName(evt.target.title);
						const gui = require("nw.gui");
						const menu = new gui.Menu();
						menu.append(new gui.MenuItem({
							label: translations.L10N_DESCRIPTION,
							click: () => {
								gui.Shell.openExternal("http://www.gametdb.com/WiiU/" + game.id);
							}
						}));
						//menu.append(new gui.MenuItem({ type: "separator" }));
						menu.popup(evt.x, evt.y);
					});
				},
				function _getGameByName(name) {
					let game = null;
					this.model.config.games.forEach((element) => {
						if (element.name === name) {
							game = element;
							return;
						}
					});
					return game;
				}
			]
		});
	}
);