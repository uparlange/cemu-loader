define(["AppUtils", "WmicManager"],
	function (AppUtils, WmicManager) {
		return ng.core.Class({
			constructor: [WmicManager, ng.core.NgZone,
				function AppModel(WmicManager, NgZone) {
					this._wmicManager = WmicManager;
					this._ngZone = NgZone;
					this.config = {
						file: AppUtils.getConfigFile(),
						autostart: false,
						startMinimized: false,
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
					this._init();
				}
			],
			save: function () {
				const fs = require("fs");
				fs.writeFileSync(AppUtils.getConfigFile(), JSON.stringify(this.config));
				this.unSelectGame();
				//this._checkAutostart();
			},
			trackGame: function (index, value) {
				return value.name;
			},
			unSelectGame: function () {
				this.currentGame = null;
			},
			addGame: function () {
				const game = {
					id: null,
					name: "New Game",
					image: null,
					file: null
				};
				this.config.games.unshift(game);
				this.currentGame = game;
			},
			removeGame: function (game) {
				const index = this.config.games.indexOf(game);
				this.config.games.splice(index, 1);
				this.unSelectGame();
			},
			setCemuFile: function (file) {
				this.config.cemu.file = '"' + file + '"';
				this._initUpdateCemuVersion();
			},
			setGameImage: function (game, file) {
				game.image = "file:" + file;
			},
			setGameFile: function (game, file) {
				game.file = '"' + file + '"';
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
				this._initUpdateCemuVersion();
				this._initGameDb();
			},
			_initUpdateCemuVersion: function () {
				if(this.config.cemu.file != null) {
					const file = this.config.cemu.file.replace(/"/g, "");
					this._wmicManager.getDatafileVersion(file).subscribe((version) => {
						this._ngZone.run(() => {
							this.cemu.localVersion = version;
							this._initUpdateCemuHookVersion();
						});
					});
				}
			},
			_initUpdateCemuHookVersion: function () {
				if(this.config.cemu.file != null) {
					const file = this.config.cemu.file.replace(/"/g, "").replace("Cemu.exe", "dbghelp.dll");
					this._wmicManager.getDatafileVersion(file).subscribe((version) => {
						this._ngZone.run(() => {
							this.cemuHook.localVersion = version;
						});
					});
				}
			},
			_initConfig: function () {
				const fs = require("fs");
				if (fs.existsSync(this.config.file)) {
					this.config = require(this.config.file);
				} else {
					this.save();
				}
			},
			_initGameDb: function () {
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
		});
	});