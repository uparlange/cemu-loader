define(["AppUtils", "TranslateManager", "GameHelper", "UserConfigHelper"],
	function (AppUtils, TranslateManager, GameHelper, UserConfigHelper) {
		return AppUtils.getClass({
			constructor: function AppModel(TranslateManager, GameHelper, UserConfigHelper) {
				// User config
				this.config = UserConfigHelper.getNew();
				// ConfigGamesView
				this.games = [];
				this.currentGame = null;
				this.gameTypes = [];
				this.currentGameType = "WiiU";
				// ConfigParamsView
				this.currentPanel = "application";
				this.picturesFolder = AppUtils.getPicturesPath();
				// -----
				this._translateManager = TranslateManager;
				this._onLanguageChangeSubscriber = null;
				this._gameHelper = GameHelper;
				this._init();
			},
			parameters: [
				[TranslateManager], [GameHelper], [UserConfigHelper]
			],
			functions: {
				setLanguage: function (language) {
					this._translateManager.setLanguage(language);
				},
				setRenderer: function (renderer) {
					this.config.renderer = renderer;
				},
				save: function () {
					const fs = require("fs");
					fs.writeFileSync(AppUtils.getUserConfigPath(), JSON.stringify(this.config));
					this.unSelectGame();
					//this._checkAutostart();
				},
				clearGames: function () {
					this.config.games = [];
				},
				unSelectGame: function () {
					this.currentGame = null;
				},
				addGame: function (game) {
					if (game == null) {
						this._translateManager.getValues(["L10N_NEW_GAME"]).subscribe((translations) => {
							const name = translations.L10N_NEW_GAME + " " + (this.config.games.length + 1);
							const game = this._gameHelper.getNew(name);
							this.config.games.unshift(game);
							this.currentGame = game;
						});
					} else {
						this.config.games.unshift(game);
						this.currentGame = game;
					}
				},
				removeGame: function (game) {
					const index = this.config.games.indexOf(game);
					this.config.games.splice(index, 1);
					this.unSelectGame();
				},
				setCemuFile: function (file) {
					const eventEmitter = new ng.core.EventEmitter();
					this.config.cemu.file = file;
					setTimeout(() => {
						eventEmitter.emit();
					}, 0);
					return eventEmitter;
				},
				setGameFile: function (game, file) {
					game.file = file;
				},
				setRomsFolder: function (folder) {
					this.config.cemu.romsFolder = folder;
				},
				_checkAutostart: function () {
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
				_init: function () {
					this._initConfig();
					this._initLanguage();
					this._initGameDb();
				},
				_initLanguage: function () {
					this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe((language) => {
						this.config.language = language;
					});
					this.setLanguage(this.config.language);
				},
				_initConfig: function () {
					const fs = require("fs");
					if (fs.existsSync(this.config.file)) {
						this.config = Object.assign(this.config, require(this.config.file));
					} else {
						this.save();
					}
				},
				_initGameDb: function () {
					const fs = require("fs");
					const XML = require("pixl-xml");
					const games = [];
					const gameTypes = [];
					fs.readFile(AppUtils.getDatabasePath(), (err, result) => {
						const doc = XML.parse(result);
						doc.game.forEach((element) => {
							games.push({
								id: element.id,
								name: element.name,
								type: element.type,
								images: []
							});
							if (gameTypes.indexOf(element.type) == -1) {
								gameTypes.push(element.type);
							}
						});
						this.games = games;
						this.gameTypes = gameTypes;
					});
				}
			}
		});
	}
);