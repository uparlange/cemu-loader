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
			functions: {
				ngOnInit: function () {
					this._shell.init(this.model.config);
					this._routerManager.on("NAVIGATION_END").subscribe((event) => {
						this.currentView = event.toUrl;
					});
					if (this.model.config.games.length === 0) {
						this._showView("/config/params");
					} else {
						this._showList();
					}
				},
				onChange: function (view) {
					if (view === "list") {
						this._showList();
					} else {
						this._showView(view);
					}
				},
				_showList: function () {
					this._routerManager.showList(this.model.config.renderer);
				},
				_showView: function (view) {
					this._routerManager.navigate([view]);
				}
			}
		});
	}
);