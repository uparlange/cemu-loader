define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function UserConfigHelper() {

            },
            functions: {
                getNew: function () {
                    return {
                        file: AppUtils.getUserConfigPath(),
                        autostart: false,
                        startMinimized: false,
                        renderer: "maccrazy",
                        language: "en",
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