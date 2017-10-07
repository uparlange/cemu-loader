define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function ImageComponent() {
                this.icon = null;
                this.iconType = "fa";
            },
            annotations: [
                new ng.core.Component(AppUtils.getComponentConfiguration("image-component", {
                    inputs: ["icon", "iconType"]
                }))
            ]
        });
    }
);