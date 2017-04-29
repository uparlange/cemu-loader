define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("config-params");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, CemuManager, ng.router.Router, 
				function ConfigParamsView(AppModel, CemuManager, Router) {
					this.model = AppModel;
					this._router = Router;
					this._cemuManager = CemuManager;
				}
			],
			addGame: function () {
				this.model.addGame();
			},
			removeGame: function (game) {
				this.model.removeGame(game);
			},
			findGame: function () {
				this._router.navigate(["/config/games"]);
			},
			toggleEditGame: function (game) {
				if (this.model.currentGame === game) {
					this.model.currentGame = null;
				} else {
					this.model.currentGame = game;
				}
			},
			openCemuFileDirectory: function () {
				const item = this.model.config.cemu.file.replace(/"/g, "");
				nw.Shell.showItemInFolder(item);
			},
			openGameFileDirectory: function (game) {
				const item = game.file.replace(/"/g, "");
				nw.Shell.showItemInFolder(item);
			},
			openConfigDirectory: function () {
				const item = AppUtils.getConfigFile();
				nw.Shell.showItemInFolder(item);
			},
			selectCemuFile: function () {
				this._selectFile().subscribe((file) => {
					this.model.setCemuFile(file);
				});
			},
			selectGameImage: function (game) {
				this._selectFile().subscribe((file) => {
					this.model.setGameImage(game, file);
				});
			},
			selectGameFile: function (game) {
				this._selectFile().subscribe((file) => {
					this.model.setGameFile(game, file);
				});
			},
			saveConfiguration: function () {
				this.model.save();
				this._router.navigate(["/list"]);
			},
			launchCemu: function () {
				this._cemuManager.launchCemu();
			},
			_selectFile: function () {
				const eventEmitter = new ng.core.EventEmitter();
				const chooser = document.querySelector("#fileDialog");
				const handler = function () {
					chooser.removeEventListener("change", handler);
					eventEmitter.emit(chooser.value);
				};
				chooser.addEventListener("change", handler);
				chooser.click();
				return eventEmitter;
			}
		})
	});