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
				}
			],
			ngOnInit: function () {
				const win = nw.Window.get();
				const pkg = AppUtils.getPackage();
				win.title = pkg.description + " " + pkg.version;
				win.menu = null;
			},
			showView: function (view) {
				this._routerManager.showView(view);
			}
		});
	});