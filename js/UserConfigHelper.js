define(["AppUtils", "TranslateManager"],
    function (AppUtils, TranslateManager) {
        return AppUtils.getClass({
            constructor: function UserConfigHelper(TranslateManager) {
                this._translateManager = TranslateManager;
            },
            parameters: [
                [TranslateManager]
            ],
            functions: {
                getNew: function () {
                    return {
                        file: AppUtils.getUserConfigPath(),
                        autostart: false,
                        startMinimized: false,
                        renderer: "maccrazy",
                        language: this._translateManager.getDefaultLanguage(),
                        cemu: {
                            file: null,
                            romsFolder: null,
                            fullscreen: true,
                        },
                        games: []
                    }
                }
            }
        });
    }
);