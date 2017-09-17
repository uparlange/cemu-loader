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
			functions: [
				function ngOnInit() {
					this._initSelectedLanguage();
					this._initSelectedRenderer();
					this._initUpdateCemuVersion();
					this._initUpdateCemuHookVersion();
				},
				function onLanguageChange(language) {
					this.model.setLanguage(language.data);
				},
				function onRendererChange(renderer) {
					this.model.setRenderer(renderer.data);
				},
				function addGame() {
					this.model.addGame();
				},
				function removeGame(game) {
					this.model.removeGame(game);
				},
				function findGame() {
					this._routerManager.showConfigGames();
				},
				function toggleEditGame(game) {
					if (this.model.currentGame === game) {
						this.model.currentGame = null;
					} else {
						this.model.currentGame = game;
					}
				},
				function openCemuFileFolder() {
					const item = this.model.config.cemu.file;
					nw.Shell.showItemInFolder(item);
				},
				function openGameFileFolder(game) {
					const item = game.file;
					nw.Shell.showItemInFolder(item);
				},
				function openConfigFolder() {
					const item = AppUtils.getUserConfigFile();
					nw.Shell.showItemInFolder(item);
				},
				function selectRomsFolder() {
					this._selectFolder().subscribe((folder) => {
						this.model.setRomsFolder(folder);
					});
				},
				function openRomsFolder() {
					nw.Shell.openItem(this.model.config.cemu.romsFolder);
				},
				function magicFindGames() {
					const romsFolder = this.model.config.cemu.romsFolder;
					let romsToTreat = [];
					const treatNextRom = () => {
						if (romsToTreat.length > 0) {
							const path = romsFolder + "\\" + romsToTreat.shift();
							fs.lstat(path, (err, stats) => {
								if (stats.isDirectory()) {
									this._initLoadiineGame(path).subscribe((game) => {
										this._ngZone.run(() => {
											this.model.addGame(game);
											this.progress.value++;
											treatNextRom();
										});
									})
								}
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
				function selectCemuFile() {
					this._selectFile().subscribe((file) => {
						this.model.setCemuFile(file).subscribe(() => {
							this._initUpdateCemuVersion();
							this._initUpdateCemuHookVersion();
						});
					});
				},
				function selectGameImage(game) {
					this._selectFile().subscribe((file) => {
						game.image = file;
					});
				},
				function selectGameFile(game) {
					this._selectFile().subscribe((file) => {
						this.model.setGameFile(game, file);
					});
				},
				function saveConfiguration() {
					this.model.save();
					this._routerManager.showList(this.model.config.renderer);
				},
				function launchCemu() {
					this._cemuManager.launchCemu();
				},
				function _initLoadiineGame(path) {
					const eventEmitter = new ng.core.EventEmitter();
					const metaxmlPath = path + "\\meta\\meta.xml";
					const fs = require("fs");
					const tga2png = require("tga2png");
					fs.lstat(metaxmlPath, (err, stats) => {
						if (stats.isFile()) {
							const xml2js = require("xml2js");
							const parser = new xml2js.Parser();
							fs.readFile(metaxmlPath, (err, result) => {
								parser.parseString(result, (err, result) => {
									const id = result.menu.title_id[0]._;
									const name = result.menu.longname_en[0]._;
									const game = this.gameHelper.getNew(name);
									game.id = id;
									const rpxFolder = path + "\\code";
									fs.readdir(rpxFolder, (err, files) => {
										if (!err) {
											files.forEach((filename) => {
												if (filename.indexOf(".rpx") !== -1) {
													this.model.setGameFile(game, rpxFolder + "\\" + filename);
													const imageSourcePath = path + "\\meta\\iconTex.tga";
													const imageDestPath = AppUtils.getPicturesPath() + "\\" + game.id + "_iconTex.png";
													tga2png(imageSourcePath, imageDestPath).then(() => {
														game.image = imageDestPath;
														const backgroundSourcePath = path + "\\meta\\bootDrcTex.tga";
														const backgroundDestPath = AppUtils.getPicturesPath() + "\\" + game.id + "_bootDrcTex.png";
														tga2png(backgroundSourcePath, backgroundDestPath).then(() => {
															game.background = backgroundDestPath;
															eventEmitter.emit(game);
														}, () => {
															// TODO
														});
													}, () => {
														// TODO
													});
													return;
												}
											})
										}
									});
								});
							});
						}
					});
					return eventEmitter;
				},
				function _initSelectedLanguage() {
					this.config.languages.forEach((item) => {
						if (item.data === this.model.config.language) {
							this.selectedLanguage = item;
							return;
						}
					});
				},
				function _initSelectedRenderer() {
					this.config.renderers.forEach((item) => {
						if (item.data === this.model.config.renderer) {
							this.selectedRenderer = item;
							return;
						}
					});
				},
				function _initUpdateCemuVersion() {
					if (this.model.config.cemu.file != null) {
						const file = this.model.config.cemu.file;
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.version.cemu = version;
							});
						});
					}
				},
				function _initUpdateCemuHookVersion() {
					if (this.model.config.cemu.file != null) {
						const file = this.model.config.cemu.file.replace("Cemu.exe", "dbghelp.dll");
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.version.cemuHook = version;
							});
						});
					}
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
				},
				function _selectFolder() {
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
			]
		});
	}
);