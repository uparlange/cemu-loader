define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent() {
                this.change = new ng.core.EventEmitter();
            },
            functions: [
                function onClickHandler(game) {
                    this.change.emit(game);
                }
            ]
        });
    }
);