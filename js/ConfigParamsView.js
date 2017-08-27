define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		return AppUtils.getClass({
			constructor: function ConfigParamsView(AppModel, CemuManager, Router) {
				this.model = AppModel;
				this._router = Router;
				this._cemuManager = CemuManager;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-params"))
			],
			parameters: [
				[AppModel], [CemuManager], [ng.router.Router]
			],
			functions: [
				function addGame() {
					this.model.addGame();
				},
				function removeGame(game) {
					this.model.removeGame(game);
				},
				function findGame() {
					this._router.navigate(["/config/games"]);
				},
				function toggleEditGame(game) {
					if (this.model.currentGame === game) {
						this.model.currentGame = null;
					} else {
						this.model.currentGame = game;
					}
				},
				function openCemuFileDirectory() {
					const item = this.model.config.cemu.file.replace(/"/g, "");
					nw.Shell.showItemInFolder(item);
				},
				function openGameFileDirectory(game) {
					const item = game.file.replace(/"/g, "");
					nw.Shell.showItemInFolder(item);
				},
				function openConfigDirectory() {
					const item = AppUtils.getConfigFile();
					nw.Shell.showItemInFolder(item);
				},
				function selectCemuFile() {
					this._selectFile().subscribe((file) => {
						this.model.setCemuFile(file);
					});
				},
				function selectGameImage(game) {
					this._selectFile().subscribe((file) => {
						this.model.setGameImage(game, file);
					});
				},
				function selectGameFile(game) {
					this._selectFile().subscribe((file) => {
						this.model.setGameFile(game, file);
					});
				},
				function saveConfiguration() {
					this.model.save();
					this._router.navigate(["/list"]);
				},
				function launchCemu() {
					this._cemuManager.launchCemu();
				},
				function _selectFile() {
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
			]
		});
	}
);