define(["AppUtils", "AppModel"],
	function (AppUtils, AppModel) {
		const conf = AppUtils.getComponentConfiguration("app", {
			selector: "body"
		});
		return ng.core.Component(conf).Class({
			constructor: [AppModel, ng.router.Router,
				function AppView(AppModel, Router) {
					this.model = AppModel;
					this._router = Router;
					this._routerEventsSubscriber = null;
					this.currentView = "/list";
				}
			],
			ngOnInit: function () {
				const win = nw.Window.get();
				const pkg = AppUtils.getPackage();
				win.title = pkg.description + " " + pkg.version;
				this._routerEventsSubscriber = this._router.events.subscribe((event) => {
					if (event.constructor.name === "NavigationEnd") {
						const currentView = "/" + event.url.split("/")[1];
						if (currentView !== "/") {
							this.currentView = currentView;
						}
					}
				});
			},
			ngOnDestroy: function () {
				this._routerEventsSubscriber();
			},
			showView: function (view) {
				this.currentView = view;
				this._router.navigate([view]);
			}
		});
	});