define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function GameHelper() {

            },
            functions: {
                getNew: function (name) {
                    return {
                        id: null,
                        name: name,
                        image: null,
                        file: null
                    };
                },
                track: function (index, value) {
                    return value.name;
                }
            }
        });
    }
);