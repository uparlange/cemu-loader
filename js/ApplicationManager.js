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
			functions: [
				function init() {
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
				function show() {
					nw.Window.get().show();
				},
				function hide() {
					nw.Window.get().hide();
				},
				function quit() {
					nw.App.quit();
				},
				function addDesktopShortcut(path, options) {
					const ws = require("windows-shortcuts");
					options.iconIndex = '0';
					options.runStyle = ws.MIN;
					ws.create(path, options, (error) => {
						if (error) {
							alert(error);
						}
					});
				},
				function _initTray(title) {
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
				function _initUpdateTrayMenu() {
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
				function _initWindow(title) {
					const win = nw.Window.get();
					win.title = title;
					win.on("close", () => {
						this.hide();
					});
				}
			]
		});
	}
);