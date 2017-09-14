define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent(RendererHelper) {
                this.provider = RendererHelper.provider;
                this.gameTrack = RendererHelper.gameTrack;
                this._rendererHelper = RendererHelper;
            },
            functions: [
                function play(game) {
                    this._rendererHelper.play(game);
                }
            ]
        });
    }
);