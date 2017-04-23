define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("list");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, CemuManager,
				function ListView(AppModel, CemuManager) {
					this.model = AppModel;
					this._cemuManager = CemuManager;
					this.onContextmenuHandler = null;
				}
			],
			ngOnInit: function () {
				this.model.init();
				this.onContextmenuHandler = (evt) => {
					evt.preventDefault();
					this._displayRightClickMenu(evt);
					return false;
				};
				document.body.addEventListener("contextmenu", this.onContextmenuHandler);
			},
			ngOnDestroy: function () {
				document.body.removeEventListener("contextmenu", this.onContextmenuHandler);
			},
			launchGame: function (game) {
				this._cemuManager.launchGame(game);
			},
			_displayRightClickMenu: function (evt) {
				const game = this._getGameByName(evt.target.title);
				if (game.id !== null) {
					const gui = require("nw.gui");
					const menu = new gui.Menu();
					menu.append(new gui.MenuItem({
						label: "GameTDB",
						click: () => {
							gui.Shell.openExternal("http://www.gametdb.com/WiiU/" + game.id);
						}
					}));
					//menu.append(new gui.MenuItem({ type: "separator" }));
					menu.popup(evt.x, evt.y);
				}
			},
			_getGameByName: function (name) {
				let game = {
					id: null
				};
				this.model.config.games.forEach((element) => {
					if (element.name === name) {
						game = element;
						return;
					}
				});
				return game;
			}
		})
	});