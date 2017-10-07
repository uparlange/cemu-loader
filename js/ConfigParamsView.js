define(["AppUtils", "AppModel", "CemuManager", "WmicManager", "GameHelper",
	"ItemHelper", "RouterManager"],
	function (AppUtils, AppModel, CemuManager, WmicManager, GameHelper,
		ItemHelper, RouterManager) {
		return AppUtils.getClass({
			constructor: function ConfigParamsView(AppModel, CemuManager, WmicManager, NgZone, GameHelper,
				ItemHelper, RouterManager) {
				this.model = AppModel;
				this.config = AppUtils.getConfigFile();
				this.version = {
					application: AppUtils.getPackageFile().version,
					cemu: null,
					cemuHook: null
				};
				this.gameHelper = GameHelper;
				this.itemHelper = ItemHelper;
				this.selectedLanguage = null;
				this.selectedRenderer = null;
				this.progress = {
					visible: false,
					value: 0,
					max: 0
				};
				this._cemuManager = CemuManager;
				this._wmicManager = WmicManager;
				this._ngZone = NgZone;
				this._routerManager = RouterManager;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-params-view"))
			],
			parameters: [
				[AppModel], [CemuManager], [WmicManager], [ng.core.NgZone], [GameHelper],
				[ItemHelper], [RouterManager]
			],
			functions: {
				ngOnInit: function () {
					this._initSelectedLanguage();
					this._initSelectedRenderer();
					this._initUpdateCemuVersion();
					this._initUpdateCemuHookVersion();
				},
				onLanguageChange: function (language) {
					this.model.setLanguage(language.data);
				},
				onRendererChange: function (renderer) {
					this.model.setRenderer(renderer.data);
				},
				addGame: function () {
					this.model.addGame();
				},
				removeGame: function (game) {
					this.model.removeGame(game);
				},
				findGame: function () {
					this._routerManager.showConfigGames();
				},
				toggleEditGame: function (game) {
					if (this.model.currentGame === game) {
						this.model.currentGame = null;
					} else {
						this.model.currentGame = game;
					}
				},
				openCemuFileFolder: function () {
					nw.Shell.showItemInFolder(this.model.config.cemu.file);
				},
				openGameFileFolder: function (game) {
					nw.Shell.showItemInFolder(game.file);
				},
				openConfigFolder: function () {
					nw.Shell.showItemInFolder(this.model.config.file);
				},
				openPicturesFolder: function () {
					nw.Shell.openItem(this.model.picturesFolder);
				},
				openRomsFolder: function () {
					nw.Shell.openItem(this.model.config.cemu.romsFolder);
				},
				selectRomsFolder: function () {
					this._selectFolder().subscribe((folder) => {
						this.model.setRomsFolder(folder);
					});
				},
				scanGames: function () {
					const romsFolder = this.model.config.cemu.romsFolder;
					let romsToTreat = [];
					const treatNextRom = () => {
						if (romsToTreat.length > 0) {
							const path = romsFolder + "\\" + romsToTreat.shift();
							this._cemuManager.scanGame(path).subscribe((game) => {
								this._ngZone.run(() => {
									this.model.addGame(game);
									this.progress.value++;
									treatNextRom();
								});
							});
						} else {
							this.progress.visible = false;
						}
					};
					const fs = require("fs");
					fs.readdir(romsFolder, (err, roms) => {
						romsToTreat = roms;
						this._ngZone.run(() => {
							this.model.clearGames();
							this.progress.visible = true;
							this.progress.max = roms.length;
							this.progress.value = 0;
						});
						treatNextRom();
					});
				},
				selectCemuFile: function () {
					this._selectFile().subscribe((file) => {
						this.model.setCemuFile(file).subscribe(() => {
							this._initUpdateCemuVersion();
							this._initUpdateCemuHookVersion();
						});
					});
				},
				selectGameImage: function (game) {
					this._selectFile().subscribe((file) => {
						game.image = file;
					});
				},
				selectGameBackground: function (game) {
					this._selectFile().subscribe((file) => {
						game.background = file;
					});
				},
				selectGameFile: function (game) {
					this._selectFile().subscribe((file) => {
						this.model.setGameFile(game, file);
					});
				},
				saveConfiguration: function () {
					this.model.save();
					this._routerManager.showList(this.model.config.renderer);
				},
				launchCemu: function () {
					this._cemuManager.launchCemu();
				},
				_initSelectedLanguage: function () {
					this.config.languages.forEach((item) => {
						if (item.data === this.model.config.language) {
							this.selectedLanguage = item;
							return;
						}
					});
				},
				_initSelectedRenderer: function () {
					this.config.renderers.forEach((item) => {
						if (item.data === this.model.config.renderer) {
							this.selectedRenderer = item;
							return;
						}
					});
				},
				_initUpdateCemuVersion: function () {
					if (this.model.config.cemu.file != null) {
						const file = this.model.config.cemu.file;
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.version.cemu = version;
							});
						});
					}
				},
				_initUpdateCemuHookVersion: function () {
					if (this.model.config.cemu.file != null) {
						const file = this.model.config.cemu.file.replace("Cemu.exe", "dbghelp.dll");
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.version.cemuHook = version;
							});
						});
					}
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
				},
				_selectFolder: function () {
					const eventEmitter = new ng.core.EventEmitter();
					const chooser = document.querySelector("#folderDialog");
					const handler = function () {
						chooser.removeEventListener("change", handler);
						eventEmitter.emit(chooser.value);
					};
					chooser.addEventListener("change", handler);
					chooser.click();
					return eventEmitter;
				}
			}
		});
	}
);