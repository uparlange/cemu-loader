define(["AppUtils", "TranslateManager"],
    function (AppUtils, TranslateManager) {
        return AppUtils.getClass({
            constructor: function UserConfigHelper(TranslateManager) {
                this._translateManager = TranslateManager;
            },
            parameters: [
                [TranslateManager]
            ],
            functions: [
                function getNew() {
                    return {
                        file: AppUtils.getUserConfigFile(),
                        autostart: false,
                        startMinimized: false,
                        renderer: "tile",
                        language: this._translateManager.getDefaultLanguage(),
                        cemu: {
                            file: null,
                            romsFolder: null,
                            fullscreen: true,
                        },
                        games: []
                    }
                }
            ]
        });
    }
);