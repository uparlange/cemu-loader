define(["AppUtils", "AppModel", "ApplicationManager", "TranslateManager"],
    function (AppUtils, AppModel, ApplicationManager, TranslateManager) {
        return AppUtils.getClass({
            constructor: function CemuManager(AppModel, Router, ApplicationManager, TranslateManager) {
                this._model = AppModel;
                this._router = Router;
                this._applicationManager = ApplicationManager;
                this._translateManager = TranslateManager;
            },
            parameters: [
                [AppModel], [ng.router.Router], [ApplicationManager], [TranslateManager]
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
                        this._translateManager.getValues([{ key: "L10N_CONFIGURE_XXX_FILE", properties: [game.name] }]).subscribe((translations) => {
                            window.alert(translations.L10N_CONFIGURE_XXX_FILE);
                            this._router.navigate(["/config"]);
                        });
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
                        this._translateManager.getValues([{ key: "L10N_CONFIGURE_XXX_FILE", properties: ["Cemu"] }]).subscribe((translations) => {
                            window.alert(translations.L10N_CONFIGURE_XXX_FILE);
                        });
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