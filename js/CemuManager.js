define(["AppUtils", "AppModel", "ApplicationManager", "TranslateManager", "RouterManager",
    "ImageManager", "GameHelper"],
    function (AppUtils, AppModel, ApplicationManager, TranslateManager, RouterManager,
        ImageManager, GameHelper) {
        return AppUtils.getClass({
            constructor: function CemuManager(AppModel, ApplicationManager, TranslateManager, RouterManager, ImageManager,
                GameHelper) {
                this._model = AppModel;
                this._applicationManager = ApplicationManager;
                this._translateManager = TranslateManager;
                this._routerManager = RouterManager;
                this._imageManager = ImageManager;
                this._gameHelper = GameHelper;
            },
            parameters: [
                [AppModel], [ApplicationManager], [TranslateManager], [RouterManager], [ImageManager],
                [GameHelper]
            ],
            functions: {
                init: function () {

                },
                launchCemu: function () {
                    let cmd = this.getLaunchGameTarget();
                    this._launch(cmd);
                },
                launchGame: function (game) {
                    if (game.file === null) {
                        this._translateManager.getValues([{ key: "L10N_CONFIGURE_XXX_FILE", properties: [game.name] }]).subscribe((translations) => {
                            window.alert(translations.L10N_CONFIGURE_XXX_FILE);
                            this._routerManager.showConfigParams();
                        });
                        return;
                    }
                    let cmd = this.getLaunchGameTarget() + this.getLaunchGameArgs(game);
                    this._launch(cmd);
                },
                getLaunchGameTarget: function () {
                    return "\"" + this._model.config.cemu.file + "\"";
                },
                getLaunchGameArgs: function (game) {
                    let args = " -g \"" + game.file + "\"";
                    if (this._model.config.cemu.fullscreen) {
                        args += " -f";
                    }
                    return args;
                },
                scanGame: function (path) {
                    const eventEmitter = new ng.core.EventEmitter();
                    const fs = require("fs");
                    fs.lstat(path, (err, stats) => {
                        if (stats.isDirectory()) {
                            this._scanLoadiineGame(path).subscribe((game) => {
                                eventEmitter.emit(game);
                            })
                        } else {
                            const name = path.substring(path.lastIndexOf("\\")+1, path.indexOf("."));
                            const game = this._gameHelper.getNew(name);
                            game.image = "images/default-image.png";
                            game.background = "images/default-background.png";
                            game.file = path;
                            eventEmitter.emit(game);
                        }
                    });
                    return eventEmitter;
                },
                _scanLoadiineGame: function (path) {
                    const eventEmitter = new ng.core.EventEmitter();
                    const metaxmlPath = path + "\\meta\\meta.xml";
                    const fs = require("fs");
                    fs.lstat(metaxmlPath, (err, stats) => {
                        if (stats.isFile()) {
                            const XML = require("pixl-xml");
                            fs.readFile(metaxmlPath, (err, result) => {
                                const doc = XML.parse(result);
                                const id = doc.title_id._Data;
                                const name = doc.longname_en._Data;
                                const game = this._gameHelper.getNew(name);
                                game.id = id;
                                const rpxFolder = path + "\\code";
                                fs.readdir(rpxFolder, (err, files) => {
                                    if (!err) {
                                        files.forEach((filename) => {
                                            if (filename.indexOf(".rpx") !== -1) {
                                                game.file = rpxFolder + "\\" + filename;
                                                const imageSrcPath = path + "\\meta\\iconTex.tga";
                                                const imageDestPath = AppUtils.getPicturesPath() + "\\" + game.id + "_image.png";
                                                const backgroundSrcPath = path + "\\meta\\bootDrcTex.tga";
                                                const backgroundDestPath = AppUtils.getPicturesPath() + "\\" + game.id + "_background.png";
                                                const inputs = [
                                                    { src: imageSrcPath, dest: imageDestPath },
                                                    { src: backgroundSrcPath, dest: backgroundDestPath }
                                                ];
                                                this._imageManager.tgaToPng(inputs).subscribe(() => {
                                                    game.image = imageDestPath;
                                                    game.background = backgroundDestPath;
                                                    eventEmitter.emit(game);
                                                })
                                                return;
                                            }
                                        })
                                    }
                                });
                            });
                        }
                    });
                    return eventEmitter;
                },
                _launch: function (cmd) {
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
            }
        });
    }
);