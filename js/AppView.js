define(["AppUtils", "AppModel", "Shell", "RouterManager"],
	function (AppUtils, AppModel, Shell, RouterManager) {
		const conf = AppUtils.getComponentConfiguration("app", {
			selector: "body"
		});
		return ng.core.Component(conf).Class({
			constructor: [AppModel, Shell, RouterManager,
				function AppView(AppModel, Shell, RouterManager) {
					this.model = AppModel;
					this._shell = Shell;
					this._routerManager = RouterManager;
					this.currentView = null;
				}
			],
			ngOnInit: function () {
				this._shell.init();
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