define(["AppUtils", "AbstractRendererComponent", "RendererHelper"],
	function (AppUtils, AbstractRendererComponent, RendererHelper) {
		return AppUtils.getClass({
			extends: AbstractRendererComponent,
			constructor: function MaccrazyRendererView(RendererHelper) {
				AbstractRendererComponent.call(this, RendererHelper);
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
				function ngOnInit() {
					// init sly
					SystemJS.import("/data/renderers/maccrazy/jquery-3.2.1.min.js").then(() => {
						SystemJS.import("/data/renderers/maccrazy/sly-1.6.1.min.js").then((Sly) => {
							this._sly = new Sly(".frame", {
								slidee: ".slidee",
								horizontal: true,
								itemNav: "basic",
								speed: "250",
								scrollBy: 1,
								scrollHijack: 100,
								mouseDragging: true,
								touchDragging: true
							});
							this._sly.init();
							// init selection
							const lastGameName = localStorage.getItem("lastGameName");
							const lastGame = (lastGameName == null) ? this.provider[0] : this._getGameByName(lastGameName);
							this.select(lastGame);
						});
					});
				},
				function ngOnDestroy() {
					this._sly.destroy();
				},
				function select(game) {
					// select new game
					this.selectedGame = game;
					// move to position
					const gameIndex = this._getGameIndex(this.selectedGame);
					this._sly.toCenter(gameIndex);
					// save lastGame
					localStorage.setItem("lastGameName", game.name);
				},
				function _getGameByName(name) {
					let game = null;
					this.provider.forEach((item) => {
						if (item.name === name) {
							game = item;
							return;
						}
					});
					return game;
				},
				function _getGameIndex(game) {
					let gameIndex = -1;
					this.provider.forEach((item, index) => {
						if (game.name === item.name) {
							gameIndex = index;
							return;
						}
					});
					return gameIndex;
				}
			]
		});
	}
);