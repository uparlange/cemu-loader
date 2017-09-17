define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function MaccrazyRendererView(RendererHelper) {
				AbstractRendererComponent.call(this, RendererHelper);
				this.description = null;
				this.selectedGame = null;
				this._sly = null;
			},
			parameters: [
				[RendererHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("maccrazy-renderer-view"))
			],
			functions: [
				function rendererInit() {
					SystemJS.import("/data/renderers/maccrazy/jquery-3.2.1.min.js").then(() => {
						SystemJS.import("/data/renderers/maccrazy/sly-1.6.1.min.js").then((Sly) => {
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
								this._initLastGame();
								// TODO fix force redraw
								var bridge = document.querySelector("[view]");
								bridge.style.display = "none";
								bridge.offsetHeight;
								bridge.style.display = "block";
							});
							this._sly.init();
						});
					});
				},
				function rendererDestroy() {
					this._sly.destroy();
				},
				function showDescription(game) {
					this.description = game.name;
				},
				function hideDescription() {
					this.description = (this.selectedGame != null) ? this.selectedGame.name : null;
				},
				function select(game) {
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
				function _initLastGame() {
					const lastGameName = localStorage.getItem("lastGameName");
					let lastGame = (lastGameName == null) ? this.provider[0] : this.helper.provider.find((game) => {
						return (game.name === lastGameName);
					});
					if (lastGame == null) {
						lastGame = this.helper.provider[0];
					}
					this.select(lastGame);
				}
			]
		});
	}
);