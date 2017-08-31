define(["AppUtils", "AppModel", "Shell", "RouterManager"],
	function (AppUtils, AppModel, Shell, RouterManager) {
		return AppUtils.getClass({
			constructor: function AppView(AppModel, Shell, RouterManager) {
				this.model = AppModel;
				this._shell = Shell;
				this._routerManager = RouterManager;
				this.currentView = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("app-view", {
					selector: "body"
				}))
			],
			parameters: [
				[AppModel], [Shell], [RouterManager]
			],
			functions: [
				function ngOnInit() {
					this._shell.init();
					this._navigationEndEventEmitter = this._routerManager.on("NAVIGATION_END").subscribe((event) => {
						this.currentView = event.toUrl.substring(1).split("/")[0];
					});
					if (this.model.config.games.length === 0) {
						this.showView("config");
					}
				},
				function ngOnDestroy() {
					this._navigationEndEventEmitter();
				},
				function showView(view) {
					this.currentView = view;
					this._routerManager.navigate(["/" + view]);
				}
			]
		});
	}
);