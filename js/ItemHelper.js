define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function ItemHelper() {

            },
            functions: {
                track: function (index, value) {
                    return value.data;
                }
            }
        });
    }
);