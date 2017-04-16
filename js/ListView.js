define(["AppUtils", "AppModel", "CemuManager"],
	function (AppUtils, AppModel, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("list");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, CemuManager,
				function ListView(AppModel, CemuManager) {
					this.model = AppModel;
					this._cemuManager = CemuManager;
					this.onContextmenuHandler = null;
				}
			],
			ngOnInit: function () {
				this.model.init();
				this.onContextmenuHandler = (ev) => 
				{
					ev.preventDefault();
					let game = null;
					this.model.config.games.forEach((element) => 
					{
						if(element.name === ev.target.title) 
						{
							game = element;
							return;
						}
					});
					if(game !== null) 
					{
						const gui = require("nw.gui");
						const menu = new gui.Menu();
						menu.append(new gui.MenuItem({ 
							label: "Test", 
							click: () => {
								gui.Shell.openExternal("http://www.jeuxvideo.com/recherche.php?q=Test : "+ game.name +"&t=40&m=51");
							} 
						}));
						//menu.append(new gui.MenuItem({ type: "separator" }));
						menu.popup(ev.x, ev.y);
					}
					return false;
				};
				document.body.addEventListener("contextmenu", this.onContextmenuHandler);
			},
			ngOnDestroy: function () {
				document.body.removeEventListener("contextmenu", this.onContextmenuHandler);
			},
			launchGame: function (game) {
				this._cemuManager.launchGame(game);
			}
		})
	});