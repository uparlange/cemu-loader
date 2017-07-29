define(["AppUtils", "AppModel"],
	function (AppUtils, AppModel) {
		return ng.core.Class({
			constructor: [AppModel,
				function ApplicationManager(AppModel) {
					this._appModel = AppModel;
				}
			],
			init: function () {
				const win = nw.Window.get();
				const pkg = AppUtils.getPackageFile();
				const title = pkg.description + " " + pkg.version;
				win.title = title;
				win.on("close", () => {
					this.hide();
				});
				const tray = new nw.Tray({
					title: title,
					tooltip: title,
					icon: "images/icon.png"
				});
				const menu = new nw.Menu();
				menu.append(new nw.MenuItem({
					label: "Quit",
					click: () => {
						this.quit();
					}
				}));
				tray.menu = menu;
				tray.on("click", () => {
					this.show();
				});
				if (this._appModel.config.startMinimized) {
					this.hide();
				}
			},
			show: function () {
				nw.Window.get().show();
			},
			hide: function () {
				nw.Window.get().hide();
			},
			quit: function () {
				nw.App.quit();
			}
		});
	});