define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		return AppUtils.getClass({
			constructor: function ListView(AppModel, CemuManager) {
				this.model = AppModel;
				this._cemuManager = CemuManager;
				this.onContextmenuHandler = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("list"))
			],
			parameters: [
				[AppModel], [CemuManager]
			],
			functions: [
				function ngOnInit() {
					this.onContextmenuHandler = (evt) => {
						evt.preventDefault();
						this._displayRightClickMenu(evt);
						return false;
					};
					document.body.addEventListener("contextmenu", this.onContextmenuHandler);
				},
				function ngOnDestroy() {
					document.body.removeEventListener("contextmenu", this.onContextmenuHandler);
				},
				function launchGame(game) {
					this._cemuManager.launchGame(game);
				},
				function _displayRightClickMenu(evt) {
					const game = this._getGameByName(evt.target.title);
					if (game.id !== null) {
						const gui = require("nw.gui");
						const menu = new gui.Menu();
						menu.append(new gui.MenuItem({
							label: "Description",
							click: () => {
								gui.Shell.openExternal("http://www.gametdb.com/WiiU/" + game.id);
							}
						}));
						//menu.append(new gui.MenuItem({ type: "separator" }));
						menu.popup(evt.x, evt.y);
					}
				},
				function _getGameByName(name) {
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
			]
		});
	}
);