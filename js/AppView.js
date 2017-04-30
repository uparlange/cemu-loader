define(["AppUtils", "AppModel", "RouterManager"],
	function (AppUtils, AppModel, RouterManager) {
		const conf = AppUtils.getComponentConfiguration("app", {
			selector: "body"
		});
		return ng.core.Component(conf).Class({
			constructor: [AppModel, RouterManager,
				function AppView(AppModel, RouterManager) {
					this.model = AppModel;
					this._routerManager = RouterManager;
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