define(["AppModel"],
    function (AppModel) {
        return ng.core.Class({
            constructor: [ng.router.Router, AppModel,
                function RouterManager(Router, AppModel) {
                    this._router = Router;
                    this._model = AppModel;
                }
            ],
            showList: function () {
                this.showView("/list");
            },
            showConfig: function () {
                this.showView("/config");
            },
            showView: function (view) {
                this._model.currentView = view;
                this._router.navigate([view]);
            }
        });
    });