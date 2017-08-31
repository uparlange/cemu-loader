define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function GameHelper() {

            },
            functions: [
                function getNew(name) {
                    return {
                        id: null,
                        name: name,
                        image: null,
                        file: null
                    };
                },
                function track(index, value) {
                    return value.name;
                }
            ]
        });
    }
);