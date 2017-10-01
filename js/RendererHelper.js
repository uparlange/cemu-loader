define(["AppUtils", "AppModel", "GameHelper", "CemuManager", "TranslateManager",
    "ItemHelper", "ApplicationManager", "ImageManager"],
    function (AppUtils, AppModel, GameHelper, CemuManager, TranslateManager,
        ItemHelper, ApplicationManager, ImageManager) {
        return AppUtils.getClass({
            constructor: function RendererHelper(AppModel, GameHelper, CemuManager, TranslateManager, ItemHelper,
                ApplicationManager, DomSanitizer, ImageManager) {
                this.gameTrack = GameHelper.track;
                this.optionTrack = ItemHelper.track;
                this.provider = [];
                this.options = [];
                this._model = AppModel;
                this._cemuManager = CemuManager;
                this._translateManager = TranslateManager;
                this._applicationManager = ApplicationManager;
                this._domSanitizer = DomSanitizer;
                this._imageManager = ImageManager;
            },
            parameters: [
                [AppModel], [GameHelper], [CemuManager], [TranslateManager], [ItemHelper],
                [ApplicationManager], [ng.platformBrowser.DomSanitizer], [ImageManager]
            ],
            functions: {
                init: function () {
                    this.provider = this._model.config.games;
                    this._initOptions();
                },
                destroy: function () {

                },
                getImageUrl: function (source) {
                    return this._domSanitizer.bypassSecurityTrustUrl(source);
                },
                playGame: function (game) {
                    this._cemuManager.launchGame(game);
                },
                addDesktopShortcut: function (game) {
                    const icoDestPath = AppUtils.getPicturesPath() + "\\" + game.id + ".ico";
                    this._imageManager.toIco([{ src: game.image, dest: icoDestPath }]).subscribe(() => {
                        const path = AppUtils.getDesktopPath() + "\\" + game.id + '.lnk';
                        const options = {
                            target: this._cemuManager.getLaunchGameTarget(),
                            args: this._cemuManager.getLaunchGameArgs(game),
                            icon: icoDestPath
                        }
                        this._applicationManager.addDesktopShortcut(path, options);
                    });
                },
                executeGameOption: function (game, option) {
                    if (typeof (this[option.data]) === "function") {
                        this[option.data](game);
                    }
                },
                _initOptions: function () {
                    const options = [];
                    this._translateManager.getValues(["L10N_PLAY", "L10N_ADD_DESKTOP_SHORTCUT"]).subscribe((translations) => {
                        options.push({
                            icon: "fa-play",
                            data: "playGame",
                            label: translations.L10N_PLAY
                        });
                        options.push({
                            icon: "fa-external-link",
                            data: "addDesktopShortcut",
                            label: translations.L10N_ADD_DESKTOP_SHORTCUT
                        });
                        this.options = options;
                    });
                }
            }
        });
    }
);