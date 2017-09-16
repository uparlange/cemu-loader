define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent(RendererHelper) {
                this.helper = RendererHelper;
            },
            functions: [
                function ngOnInit() {
                    this.helper.init();
                    if (typeof (this.rendererInit) === "function") {
                        this.rendererInit();
                    }
                },
                function ngOnDestroy() {
                    this.helper.destroy();
                    if (typeof (this.rendererDestroy) === "function") {
                        this.rendererDestroy();
                    }
                }
            ]
        });
    }
);