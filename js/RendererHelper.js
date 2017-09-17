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
            functions: [
                function init() {
                    this.provider = this._model.config.games;
                    this._initOptions();
                },
                function destroy() {

                },
                function getImageUrl(source) {
                    return this._domSanitizer.bypassSecurityTrustUrl(source);
                },
                function playGame(game) {
                    this._cemuManager.launchGame(game);
                },
                function addDesktopShortcut(game) {
                    const icoDestPath = AppUtils.getPicturesPath() + "\\" + game.id + ".ico";
                    const inputs = [
                        { src: game.image, dest: icoDestPath }
                    ]
                    this._imageManager.toIco(inputs).subscribe(() => {
                        const path = AppUtils.getDesktopPath() + "\\" + game.id + '.lnk';
                        const options = {
                            target: "\"" + this._model.config.cemu.file + "\"",
                            args: "-g \"" + game.file + "\"",
                            icon: icoDestPath
                        }
                        this._applicationManager.addDesktopShortcut(path, options);
                    });
                },
                function executeGameOption(game, option) {
                    if (typeof (this[option.data]) === "function") {
                        this[option.data](game);
                    }
                },
                function _initOptions() {
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
            ]
        });
    }
);