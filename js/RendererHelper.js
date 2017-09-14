define(["AppUtils", "AppModel", "GameHelper", "CemuManager"],
    function (AppUtils, AppModel, GameHelper, CemuManager) {
        return AppUtils.getClass({
            constructor: function ItemHelper(AppModel, GameHelper, CemuManager) {
                this.provider = AppModel.config.games;
                this.gameTrack = GameHelper.track;
                this._cemuManager = CemuManager;
            },
            parameters: [
                [AppModel], [GameHelper], [CemuManager]
            ],
            functions: [
                function play(game) {
                    this._cemuManager.launchGame(game);
                },
            ]
        });
    }
);