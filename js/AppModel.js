define(["AppUtils", "TranslateManager", "GameHelper", "UserConfigHelper"],
	function (AppUtils, TranslateManager, GameHelper, UserConfigHelper) {
		return AppUtils.getClass({
			constructor: function AppModel(TranslateManager, GameHelper, UserConfigHelper) {
				this.config = UserConfigHelper.getNew();
				this.games = [];
				this.currentGame = null;
				this.gameTypes = [];
				this.currentGameType = "WiiU";
				this._translateManager = TranslateManager;
				this._onLanguageChangeSubscriber = null;
				this._gameHelper = GameHelper;
				this._init();
			},
			parameters: [
				[TranslateManager], [GameHelper], [UserConfigHelper]
			],
			functions: [
				function setLanguage(language) {
					this._translateManager.setLanguage(language);
				},
				function setRenderer(renderer) {
					this.config.renderer = renderer;
				},
				function save() {
					const fs = require("fs");
					fs.writeFileSync(AppUtils.getUserConfigFile(), JSON.stringify(this.config));
					this.unSelectGame();
					//this._checkAutostart();
				},
				function unSelectGame() {
					this.currentGame = null;
				},
				function addGame() {
					this._translateManager.getValues(["L10N_NEW_GAME"]).subscribe((translations) => {
						const name = translations.L10N_NEW_GAME + " " + (this.config.games.length + 1);
						const game = this._gameHelper.getNew(name);
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
					const eventEmitter = new ng.core.EventEmitter();
					this.config.cemu.file = '"' + file + '"';
					setTimeout(() => {
						eventEmitter.emit();
					}, 0);
					return eventEmitter;
				}, -
				function setGameImage(game, file) {
					game.image = "file:" + file;
				},
				function setGameFile(game, file) {
					game.file = '"' + file + '"';
				},
				function setRomsFolder(folder) {
					this.config.cemu.romsFolder = folder;
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
					this._initGameDb();
				},
				function _initLanguage() {
					this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe((language) => {
						this.config.language = language;
					});
					this.setLanguage(this.config.language);
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