define(["AppUtils", "AbstractEventManager"],
    function (AppUtils, AbstractEventManager) {
        return AppUtils.getClass({
            extends: AbstractEventManager,
            constructor: function RouterManager(Router) {
                AbstractEventManager.call(this);
                this._router = Router;
                this._previousUrl = "";
                this._currentUrl = "";
            },
            parameters: [
                [ng.router.Router]
            ],
            functions: [
                function init() {
                    this._routerEventsSubscriber = this._router.events.subscribe((event) => {
                        switch (event.constructor.name) {
                            case "RoutesRecognized":
                                this.emit("NAVIGATION_START", {
                                    fromUrl: this._currentUrl,
                                    toUrl: event.urlAfterRedirects
                                });
                                break;
                            case "NavigationEnd":
                                this._previousUrl = this._currentUrl;
                                this._currentUrl = event.urlAfterRedirects;
                                this.emit("NAVIGATION_END", {
                                    fromUrl: this._previousUrl,
                                    toUrl: this._currentUrl
                                });
                                break;
                        }
                    });
                },
                function navigate(commands, extras) {
                    this._router.navigate(commands, extras);
                },
                function showConfigParams(extras) {
                    this.navigate(["/config/params"], extras);
                },
                function showConfigGames(extras) {
                    this.navigate(["/config/games"], extras);
                },
                function showResources(extras) {
                    this.navigate(["/resources"], extras);
                },
                function showList(renderer, extras) {
                    this.navigate(["/list/" + renderer], extras);
                }
            ]
        });
    });