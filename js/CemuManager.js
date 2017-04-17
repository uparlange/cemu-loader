define(["AppModel", "RouterManager"],
    function (AppModel, RouterManager) {
        return ng.core.Class({
            constructor: [AppModel, RouterManager,
                function CemuManager(AppModel, RouterManager) {
                    this._model = AppModel;
                    this._routerManager = RouterManager;
                }
            ],
            launchCemu: function () {
                let cmd = this._model.config.cemu.file;
                this._launch(cmd);
            },
            launchGame: function (game) {
                if (game.file === null) {
                    window.alert("Please configure " + game.name + "'s file");
                    this._routerManager.showConfig();
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
                    return;
                }
                const child_process = require("child_process");
                child_process.exec(cmd, (error, stdout, stderr) => {
                    if (error != null && error.length > 0) {
                        window.alert(error.toString());
                    }
                    if (stdout != null && stdout.length > 0) {
                        //console.debug(stdout);
                    }
                    if (stderr != null && stderr.length > 0) {
                        window.alert(stderr);
                    }
                });
            }
        });
    });