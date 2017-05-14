define(["AppModel", "ApplicationManager"],
    function (AppModel, ApplicationManager) {
        return ng.core.Class({
            constructor: [AppModel, ng.router.Router, ApplicationManager,
                function CemuManager(AppModel, Router, ApplicationManager) {
                    this._model = AppModel;
                    this._router = Router;
                    this._applicationManager = ApplicationManager;
                }
            ],
            launchCemu: function () {
                let cmd = this._model.config.cemu.file;
                this._launch(cmd);
            },
            launchGame: function (game) {
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
            _launch: function (cmd) {
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
            }
        });
    });