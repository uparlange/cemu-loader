define(["AppUtils", "AppModel", "RouterManager"],
	function (AppUtils, AppModel, RouterManager) {
		const conf = AppUtils.getComponentConfiguration("app", {
			selector: "body"
		});
		return ng.core.Component(conf).Class({
			constructor: [AppModel, RouterManager, ng.http.Http,
				function AppView(AppModel, RouterManager, Http) {
					this.model = AppModel;
					this._routerManager = RouterManager;
					this._http = Http;
					this._navigationEndEventEmitter = null;
					this.currentView = "list";
				}
			],
			ngOnInit: function () {
				const win = nw.Window.get();
				const pkg = AppUtils.getPackageFile();
				win.title = pkg.description + " " + pkg.version;
				this._navigationEndEventEmitter = this._routerManager.on("NAVIGATION_END").subscribe((event) => {
					this.currentView = event.toUrl.substring(1).split("/")[0];
				});
				this._http.get(AppUtils.getRemotePackageUrl()).subscribe((result) => {
					const remotePkg = result.json();
					if (remotePkg.version > pkg.version) {
						if (confirm("New version " + remotePkg.version + " available, do you want download it ?") === true) {
							nw.Shell.openExternal(AppUtils.getRemoteApplicationDownloadUrl(remotePkg.version));
						}
					}
				});
				if (this.model.config.games.length === 0) {
					this.showView("config");
				}
			},
			ngOnDestroy: function () {
				this._navigationEndEventEmitter();
			},
			showView: function (view) {
				this.currentView = view;
				this._routerManager.navigate(["/" + view]);
			}
		});
	});