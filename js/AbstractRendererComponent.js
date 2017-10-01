define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent(RendererHelper) {
                this.helper = RendererHelper;
            },
            functions: {
                ngOnInit: function () {
                    this.helper.init();
                    if (typeof (this.rendererInit) === "function") {
                        this.rendererInit();
                    }
                },
                ngOnDestroy: function () {
                    this.helper.destroy();
                    if (typeof (this.rendererDestroy) === "function") {
                        this.rendererDestroy();
                    }
                }
            }
        });
    }
);