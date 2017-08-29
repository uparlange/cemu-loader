define(["AppUtils", "WmicManager", "TranslateManager"],
	function (AppUtils, WmicManager, TranslateManager) {
		return AppUtils.getClass({
			constructor: function AppModel(WmicManager, NgZone, TranslateManager) {
				this.config = {
					file: AppUtils.getConfigFile(),
					autostart: false,
					startMinimized: false,
					language: TranslateManager.getDefaultLanguage(),
					cemu: {
						file: null,
						fullscreen: true,
					},
					games: []
				};
				this.cemu = {
					localVersion: null
				};
				this.cemuHook = {
					localVersion: null
				};
				this.games = [];
				this.currentGame = null;
				this.gameTypes = [];
				this.currentGameType = "WiiU";
				this._wmicManager = WmicManager;
				this._ngZone = NgZone;
				this._translateManager = TranslateManager;
				this._onLanguageChangeSubscriber = null;
				this._init();
			},
			parameters: [
				[WmicManager], [ng.core.NgZone], [TranslateManager]
			],
			functions: [
				function setLanguage(language) {
					this._translateManager.setLanguage(language);
				},
				function save() {
					const fs = require("fs");
					fs.writeFileSync(AppUtils.getConfigFile(), JSON.stringify(this.config));
					this.unSelectGame();
					//this._checkAutostart();
				},
				function trackGame(index, value) {
					return value.name;
				},
				function unSelectGame() {
					this.currentGame = null;
				},
				function addGame() {
					this._translateManager.getValues(["L10N_NEW_GAME"]).subscribe((translations) => {
						const game = {
							id: null,
							name: translations.L10N_NEW_GAME + " " + (this.config.games.length + 1),
							image: null,
							file: null
						};
						this.config.games.unshift(game);
						this.currentGame = game;
					});
				},
				function removeGame(game) {
					const index = this.config.games.indexOf(game);
					this.config.games.splice(index, 1);
					this.unSelectGame();
				},
				function setCemuFile(file) {
					this.config.cemu.file = '"' + file + '"';
					this._initUpdateCemuVersion();
				},
				function setGameImage(game, file) {
					game.image = "file:" + file;
				},
				function setGameFile(game, file) {
					game.file = '"' + file + '"';
				},
				function _checkAutostart() {
					const pkg = AppUtils.getPackageFile();
					const AutoLaunch = require("auto-launch");
					var cemuLoaderAutoLauncher = new AutoLaunch({
						name: pkg.description
					});
					cemuLoaderAutoLauncher.isEnabled().then((isEnabled) => {
						if (this.config.autostart) {
							if (!isEnabled) {
								cemuLoaderAutoLauncher.enable();
							}
						} else {
							if (isEnabled) {
								cemuLoaderAutoLauncher.disable();
							}
						}
					}).catch(() => {
						// TODO
					});
				},
				function _init() {
					this._initConfig();
					this._initLanguage();
					this._initUpdateCemuVersion();
					this._initGameDb();
				},
				function _initLanguage() {
					this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe((language) => {
						this.config.language = language;
					});
					this.setLanguage(this.config.language);
				},
				function _initUpdateCemuVersion() {
					if (this.config.cemu.file != null) {
						const file = this.config.cemu.file.replace(/"/g, "");
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.cemu.localVersion = version;
								this._initUpdateCemuHookVersion();
							});
						});
					}
				},
				function _initUpdateCemuHookVersion() {
					if (this.config.cemu.file != null) {
						const file = this.config.cemu.file.replace(/"/g, "").replace("Cemu.exe", "dbghelp.dll");
						this._wmicManager.getDatafileVersion(file).subscribe((version) => {
							this._ngZone.run(() => {
								this.cemuHook.localVersion = version;
							});
						});
					}
				},
				function _initConfig() {
					const fs = require("fs");
					if (fs.existsSync(this.config.file)) {
						this.config = Object.assign(this.config, require(this.config.file));
					} else {
						this.save();
					}
				},
				function _initGameDb() {
					const fs = require("fs");
					const xml2js = require("xml2js");
					const parser = new xml2js.Parser();
					const games = [];
					const gameTypes = [];
					fs.readFile(AppUtils.getDatabaseFile(), (err, result) => {
						parser.parseString(result, (err, result) => {
							result.datafile.game.forEach((element) => {
								const type = element.type[0];
								const id = element.id[0];
								const name = element.$.name;
								games.push({
									id: id,
									name: name,
									type: type,
									images: []
								});
								if (gameTypes.indexOf(type) == -1) {
									gameTypes.push(type);
								}
							});
							this.games = games;
							this.gameTypes = gameTypes;
						});
					});
				}
			]
		});
	}
);