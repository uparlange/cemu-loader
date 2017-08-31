define(["AppUtils", "AppModel", "CemuManager", "WmicManager", "GameHelper",
	"ItemHelper"],
	function (AppUtils, AppModel, CemuManager, WmicManager, GameHelper,
		ItemHelper) {
		return AppUtils.getClass({
			constructor: function ConfigParamsView(AppModel, CemuManager, Router, WmicManager, NgZone,
				GameHelper, ItemHelper) {
				this.model = AppModel;
				this.comboLanguageActive = false;
				this.comboRendererActive = false;
				this.config = AppUtils.getConfigFile();
				this.version = {
					application: AppUtils.getPackageFile().version,
					cemu: null,
					cemuHook: null
				};
				this.gameHelper = GameHelper;
				this.itemHelper = ItemHelper;
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
					this._initUpdateCemuVersion();
					this._initUpdateCemuHookVersion();
				},
				function changeLanguage(language) {
					this.model.setLanguage(language);
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
				function openCemuFileDirectory() {
					const item = this.model.config.cemu.file.replace(/"/g, "");
					nw.Shell.showItemInFolder(item);
				},
				function openGameFileDirectory(game) {
					const item = game.file.replace(/"/g, "");
					nw.Shell.showItemInFolder(item);
				},
				function openConfigDirectory() {
					const item = AppUtils.getUserConfigFile();
					nw.Shell.showItemInFolder(item);
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
				}
			]
		});
	}
);