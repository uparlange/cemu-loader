define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function GameHelper() {

            },
            functions: [
                function getNew(id, name) {
                    return {
                        id: id,
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