define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Class({
			constructor: [
				function AppModel() {
					this.config = {
						file: AppUtils.getConfigFile(),
						cemu: {
							file: null,
							fullscreen: true
						},
						games: []
					};
					this.games = [];
					this.currentGame = null;
					this._init();
				}
			],
			save: function () {
				const fs = require("fs");
				fs.writeFileSync(AppUtils.getConfigFile(), JSON.stringify(this.config));
			},
			trackGame: function (index, value) {
				return value.name;
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
				this.currentGame = null;
			},
			setCemuFile: function (file) {
				this.config.cemu.file = '"' + file + '"';
			},
			setGameImage: function (game, file) {
				game.image = "file:" + file;
			},
			setGameFile: function (game, file) {
				game.file = '"' + file + '"';
			},
			_init: function () {
				this._initConfig();
				this._initGameDb();
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
				const games = [];
				const fs = require("fs");
				const db = fs.readFileSync(AppUtils.getDatabaseFile(), "utf8");
				const xml2js = require("xml2js");
				const parser = new xml2js.Parser();
				parser.parseString(db, (err, result) => {
					result.datafile.game.forEach((element) => {
						const type = element.type[0];
						if (type === "WiiU" || type === "eShop") {
							const id = element.id[0];
							const name = element.$.name;
							let locale = "EN";
							if (name.indexOf("USA") !== -1) {
								locale = "US";
							} else if (name.indexOf("Japan") !== -1) {
								locale = "JA";
							}
							const image = "http://art.gametdb.com/wiiu/coverHQ/" + locale + "/" + id + ".jpg?" + new Date().getTime();
							games.push({
								id: id,
								name: name,
								image: image
							});
						}
					});
					this.games = games;
				});
			}
		});
	});