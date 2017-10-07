define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function AbstractRendererComponent(RendererHelper) {
                this.helper = RendererHelper;
            },
            functions: {
                ngOnInit: function () {
                    this.helper.init();
                    this._initListeners();
                    if (typeof (this.rendererInit) === "function") {
                        this.rendererInit();
                    }
                },
                ngOnDestroy: function () {
                    this.helper.destroy();
                    this._detroyListeners();
                    if (typeof (this.rendererDestroy) === "function") {
                        this.rendererDestroy();
                    }
                },
                _initListeners: function () {
                    this._keydownHandler = (event) => {
                        if (typeof (this.rendererKeyDown) === "function") {
                            this.rendererKeyDown(event);
                        }
                    }, false;
                    document.addEventListener("keydown", this._keydownHandler);
                },
                _detroyListeners: function () {
                    document.removeEventListener("keydown", this._keydownHandler);
                }
            }
        });
    }
);