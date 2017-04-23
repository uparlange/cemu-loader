define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Class({
			constructor: [ng.core.NgZone,
				function AppModel(NgZone) {
					this._ngZone = NgZone;
					this.config = {
						file: AppUtils.getConfigFile(),
						cemu: {
							file: null,
							fullscreen: true
						},
						games: []
					};
					this.games = [];
					this.currentView = "/list";
					this._init();
				}
			],
			init: function () {
				this.config.games.sort(this._sortGamesFunction);
			},
			save: function () {
				const fs = require("fs");
				this.config.games.forEach((game) => {
					game.edit = false;
				});
				fs.writeFileSync(AppUtils.getConfigFile(), JSON.stringify(this.config));
			},
			trackGame: function (index, value) {
				return value.name;
			},
			addGame: function () {
				this._ngZone.run(() => {
					this.config.games.unshift({
						id: null,
						name: "New Game",
						image: null,
						file: null,
						edit: true
					});
				});
			},
			removeGame: function (game) {
				this._ngZone.run(() => {
					const index = this.config.games.indexOf(game);
					this.config.games.splice(index, 1);
				});
			},
			setCemuFile: function (file) {
				this._ngZone.run(() => {
					this.config.cemu.file = '"' + file + '"';
				});
			},
			setGameImage: function (game, file) {
				this._ngZone.run(() => {
					game.image = "file:" + file;
				});
			},
			setGameFile: function (game, file) {
				this._ngZone.run(() => {
					game.file = '"' + file + '"';
				});
			},
			initDbGameList: function (callback) {
				if (this.games.length === 0) {
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
								this.games.push({
									id: id,
									name: name,
									image: image
								});
							}
						});
					});
					this.games.sort(this._sortGamesFunction);
					callback();
				} else {
					callback();
				}
			},
			_sortGamesFunction(g1, g2) {
				if (g1.name < g2.name) {
					return -1;
				} else if (g1.name > g2.name) {
					return 1;
				} else {
					return 0;
				}
			},
			_init: function () {
				const fs = require("fs");
				if (fs.existsSync(this.config.file)) {
					this.config = require(this.config.file);
				} else {
					this.save();
				}
			}
		});
	});