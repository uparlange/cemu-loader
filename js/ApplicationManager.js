define(["AppUtils", "AppModel", "TranslateManager"],
	function (AppUtils, AppModel, TranslateManager) {
		return AppUtils.getClass({
			constructor: function ApplicationManager(AppModel, TranslateManager) {
				this._appModel = AppModel;
				this._translateManager = TranslateManager;
				this._onLanguageChangeSubscriber = null;
				this._tray = null;
			},
			parameters: [
				[AppModel], [TranslateManager]
			],
			functions: {
				init: function () {
					const pkg = AppUtils.getPackageFile();
					const title = pkg.description;
					this._initWindow(title);
					this._initTray(title);
					if (this._appModel.config.startMinimized) {
						this.hide();
					}
					this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => {
						this._initUpdateTrayMenu();
					});
				},
				show: function () {
					nw.Window.get().show();
				},
				hide: function () {
					nw.Window.get().hide();
				},
				quit: function () {
					nw.App.quit();
				},
				addDesktopShortcut: function (path, options) {
					const ws = require("windows-shortcuts");
					options.iconIndex = '0';
					options.runStyle = ws.MIN;
					ws.create(path, options, (error) => {
						if (error) {
							alert(error);
						}
					});
				},
				_initTray: function (title) {
					this._tray = new nw.Tray({
						title: title,
						tooltip: title,
						icon: "images/icon.png"
					});
					this._tray.on("click", () => {
						this.show();
					});
					this._initUpdateTrayMenu();
				},
				_initUpdateTrayMenu: function () {
					this._translateManager.getValues(["L10N_QUIT"]).subscribe((translations) => {
						const menu = new nw.Menu();
						menu.append(new nw.MenuItem({
							label: translations.L10N_QUIT,
							click: () => {
								this.quit();
							}
						}));
						this._tray.menu = menu;
					});
				},
				_initWindow: function (title) {
					const win = nw.Window.get();
					win.title = title;
					win.on("close", () => {
						this.hide();
					});
				}
			}
		});
	}
);