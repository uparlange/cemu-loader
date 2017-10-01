define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function MaccrazyRendererView(RendererHelper, NgZone) {
				AbstractRendererComponent.call(this, RendererHelper);
				this.description = null;
				this.selectedGame = null;
				this._sly = null;
				this._zone = NgZone;
			},
			parameters: [
				[RendererHelper], [ng.core.NgZone]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("maccrazy-renderer-view"))
			],
			functions: {
				rendererInit: function () {
					SystemJS.import("/data/renderers/maccrazy/jquery-3.2.1.min.js").then(() => {
						SystemJS.import("/data/renderers/maccrazy/sly-1.6.1.min.js").then(() => {
							this._sly = new Sly(".frame", {
								slidee: ".slidee",
								horizontal: true,
								itemNav: "basic",
								speed: "250",
								scrollBy: 1,
								scrollHijack: 50,
								mouseDragging: true,
								touchDragging: true
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