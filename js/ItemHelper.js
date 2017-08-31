define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function ItemHelper() {

            },
            functions: [
                function track(index, value) {
                    return value.data;
                }
            ]
        });
    }
);