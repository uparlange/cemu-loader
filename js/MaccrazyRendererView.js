define(["AppUtils", "AbstractRendererComponent", "RendererHelper", "KeyboardManager"],
	function (AppUtils, AbstractRendererComponent, RendererHelper, KeyboardManager) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function MaccrazyRendererView(RendererHelper, NgZone, KeyboardManager) {
				AbstractRendererComponent.call(this, RendererHelper);
				this.description = null;
				this.selectedGame = null;
				this._sly = null;
				this._zone = NgZone;
				this._keyboardManager = KeyboardManager;
				this._keydownSubscriber = null;
			},
			parameters: [
				[RendererHelper], [ng.core.NgZone], [KeyboardManager]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("maccrazy-renderer-view"))
			],
			functions: {
				rendererInit: function () {
					this._keydownSubscriber = this._keyboardManager.on("keydown").subscribe((event) => {
						switch (event.code) {
							case "ArrowRight": this._selectNextGame(); break;
							case "ArrowLeft": this._selectPreviousGame(); break;
							case "Enter": this._playSelectedGame(); break;
						}
					});
					SystemJS.import("/data/renderers/maccrazy/jquery-3.2.1.min.js").then(() => {
						SystemJS.import("/data/renderers/maccrazy/sly-1.6.1.min.js").then((Sly) => {
							this._sly = new Sly(".frame", {
								slidee: ".slidee",
								horizontal: true,
								itemNav: "basic",
								speed: "250",
								scrollBy: 1,
								scrollHijack: 50
							});
							this._sly.on("load", () => {
								this._zone.run(() => {
									this._initLastGame();
								});
							});
							this._sly.init();
						});
					});
				},
				rendererDestroy: function () {
					this._sly.destroy();
					this._keydownSubscriber.unsubscribe();
				},
				showDescription: function (game) {
					this.description = game.name;
				},
				hideDescription: function () {
					this.description = (this.selectedGame != null) ? this.selectedGame.name : null;
				},
				select: function (game) {
					if (game != null) {
						this.selectedGame = game;
						this.description = this.selectedGame.name;
						const gameIndex = this.helper.provider.findIndex((game) => {
							return (game.name === this.selectedGame.name);
						});
						this._sly.toCenter(gameIndex);
						localStorage.setItem("lastGameName", game.name);
					}
				},
				_playSelectedGame: function () {
					this.helper.playGame(this.selectedGame);
				},
				_selectNextGame: function () {
					const index = this.helper.provider.indexOf(this.selectedGame);
					if (index < (this.helper.provider.length - 1)) {
						this.select(this.helper.provider[index + 1]);
					}
				},
				_selectPreviousGame: function () {
					const index = this.helper.provider.indexOf(this.selectedGame);
					if (index > 0) {
						this.select(this.helper.provider[index - 1]);
					}
				},
				_initLastGame: function () {
					const lastGameName = localStorage.getItem("lastGameName");
					let lastGame = (lastGameName == null) ? this.provider[0] : this.helper.provider.find((game) => {
						return (game.name === lastGameName);
					});
					if (lastGame == null) {
						lastGame = this.helper.provider[0];
					}
					this.select(lastGame);
				}
			}
		});
	}
);