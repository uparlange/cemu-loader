define(["AppUtils", "AppModel", "CemuManager", "WmicManager", "GameHelper",
	"ItemHelper"],
	function (AppUtils, AppModel, CemuManager, WmicManager, GameHelper,
		ItemHelper) {
		return AppUtils.getClass({
			constructor: function ConfigParamsView(AppModel, CemuManager, Router, WmicManager, NgZone,
				GameHelper, ItemHelper) {
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
				this._router = Router;
				this._cemuManager = CemuManager;
				this._wmicManager = WmicManager;
				this._ngZone = NgZone;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-params-view"))
			],
			parameters: [
				[AppModel], [CemuManager], [ng.router.Router], [WmicManager], [ng.core.NgZone],
				[GameHelper], [ItemHelper]
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
					this._router.navigate(["/config/games"]);
				},
				function toggleEditGame(game) {
					if (this.model.currentGame === game) {
						this.model.currentGame = null;
					} else {
						this.model.currentGame = game;
					}
				},
				function openCemuFileFolder() {
					const item = this.model.config.cemu.file.replace(/"/g, "");
					nw.Shell.showItemInFolder(item);
				},
				function openGameFileFolder(game) {
					const item = game.file.replace(/"/g, "");
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
					this.model.clearGames();
					const fs = require("fs");
					const romsFolder = this.model.config.cemu.romsFolder;
					fs.readdir(romsFolder, (err, roms) => {
						roms.forEach((rom) => {
							const path = romsFolder + "\\" + rom;
							fs.lstat(path, (err, stats) => {
								if (stats.isDirectory()) {
									this._addLoadiineGame(path);
								}
							});
						});
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
				function _addLoadiineGame(path) {
					const metaxmlPath = path + "\\meta\\meta.xml";
					const fs = require("fs");
					const tga2png = require("tga2png");
					fs.lstat(metaxmlPath, (err, stats) => {
						if (stats.isFile()) {
							const xml2js = require("xml2js");
							const parser = new xml2js.Parser();
							fs.readFile(metaxmlPath, (err, result) => {
								parser.parseString(result, (err, result) => {
									const game = this.gameHelper.getNew(result.menu.longname_en[0]._);
									const rpxFolder = path + "\\code";
									fs.readdir(rpxFolder, (err, files) => {
										if (!err) {
											files.forEach((filename) => {
												if (filename.indexOf(".rpx") !== -1) {
													this.model.setGameFile(game, rpxFolder + "\\" + filename);
													const iconSourcePath = path + "\\meta\\iconTex.tga";
													const iconDestPath = AppUtils.getPicturesDirectory() + "\\" + result.menu.product_code[0]._ + ".png";
													tga2png(iconSourcePath, iconDestPath).then(() => {
														this.model.setGameImage(game, iconDestPath);
														this._ngZone.run(() => {
															this.model.addGame(game);
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
						const file = this.model.config.cemu.file.replace(/"/g, "");
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.version.cemu = version;
							});
						});
					}
				},
				function _initUpdateCemuHookVersion() {
					if (this.model.config.cemu.file != null) {
						const file = this.model.config.cemu.file.replace(/"/g, "").replace("Cemu.exe", "dbghelp.dll");
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