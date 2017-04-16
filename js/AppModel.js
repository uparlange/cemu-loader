define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Class({
			constructor: [ng.core.NgZone,
				function AppModel(NgZone) {
					this._ngZone = NgZone;
					this.config = {};
					this.currentView = "/list";
					this._initConfigFile();
				}
			],
			init: function () {
				this.config.games.sort(this._sortGamesFunction);
			},
			save: function () {
				const fs = require("fs");
				fs.writeFileSync(AppUtils.getConfigFile(), JSON.stringify(this.config));
			},
			trackGame: function (index, value) {
				return value.name;
			},
			addGame: function () {
				this._ngZone.run(() => {
					this.config.games.unshift({
						name: "New Game",
						image: null,
						file: null,
						edit:true
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
			_initConfigFile: function () {
				const fs = require("fs");
				let configFile = null;
				let baseConfigFile = require(AppUtils.getBaseConfigFile());
				if (!fs.existsSync(AppUtils.getConfigFile())) {
					configFile = baseConfigFile;
				} else {
					const currentConfigFile = require(AppUtils.getConfigFile());
					baseConfigFile.games.forEach((bItem) => {
						let toAdd = true;
						currentConfigFile.games.forEach((cItem) => {
							if (bItem.name === cItem.name) {
								toAdd = false;
								return;
							}
						});
						if (toAdd) {
							currentConfigFile.games.push(bItem);
						}
					});
					configFile = currentConfigFile;
				}
				configFile.file = AppUtils.getConfigFile();

				this.config = configFile;

				this.save();
			},
			_sortGamesFunction(g1, g2) {
				if (g1.name < g2.name) {
					return -1;
				} else if (g1.name > g2.name) {
					return 1;
				} else {
					return 0;
				}
			}
		});
	});