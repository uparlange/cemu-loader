define(["AppUtils", "AppModel", "ApplicationManager"],
    function (AppUtils, AppModel, ApplicationManager) {
        return AppUtils.getClass({
            constructor: function CemuManager(AppModel, Router, ApplicationManager) {
                this._model = AppModel;
                this._router = Router;
                this._applicationManager = ApplicationManager;
            },
            parameters: [
                [AppModel], [ng.router.Router], [ApplicationManager]
            ],
            functions: [
                function init() {

                },
                function launchCemu() {
                    let cmd = this._model.config.cemu.file;
                    this._launch(cmd);
                },
                function launchGame(game) {
                    if (game.file === null) {
                        window.alert("Please configure " + game.name + "'s file");
                        this._router.navigate(["/config"]);
                        return;
                    }
                    let cmd = this._model.config.cemu.file;
                    if (this._model.config.cemu.fullscreen) {
                        cmd += " -f";
                    }
                    cmd += " -g " + game.file;
                    this._launch(cmd);
                },
                function _launch(cmd) {
                    if (this._model.config.cemu.file === null) {
                        window.alert("Please configure Cemu's file");
                        this._router.navigate(["/config"]);
                        return;
                    }
                    const child_process = require("child_process");
                    child_process.exec(cmd, (error) => {
                        if (error) {
                            alert(error);
                            return;
                        }
                    });
                    this._applicationManager.hide();
                },
            ]
        });
    }
);