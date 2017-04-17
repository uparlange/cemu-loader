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
				this.onContextmenuHandler = (evt) => {
					evt.preventDefault();
					if (evt.target.id !== null) {
						const gui = require("nw.gui");
						const menu = new gui.Menu();
						menu.append(new gui.MenuItem({
							label: "Description",
							click: () => {
								gui.Shell.openExternal("http://www.gametdb.com/WiiU/" + evt.target.id);
							}
						}));
						//menu.append(new gui.MenuItem({ type: "separator" }));
						menu.popup(evt.x, evt.y);
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