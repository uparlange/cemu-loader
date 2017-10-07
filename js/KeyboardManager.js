define(["AppUtils", "AbstractEventManager"],
    function (AppUtils, AbstractEventManager) {
        return AppUtils.getClass({
            extends: AbstractEventManager,
            constructor: function KeyboardManager() {
                AbstractEventManager.call(this);
            },
            functions: {
                init: function () {
                    document.addEventListener("keydown", (event) => {
                        this.emit("keydown", event);
                    });
                }
            }
        });
    }
);