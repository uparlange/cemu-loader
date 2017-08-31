define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent(GameHelper) {
                this.change = new ng.core.EventEmitter();
                this.gameHelper = GameHelper;
            },
            functions: [
                function onClickHandler(game) {
                    this.change.emit(game);
                }
            ]
        });
    }
);