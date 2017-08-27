define(["AppUtils"],
    function (AppUtils) {
        return AppUtils.getClass({
            constructor: function WmicManager() {

            },
            functions: [
                function init() {

                },
                function getDatafileVersion(file) {
                    const eventEmitter = new ng.core.EventEmitter();
                    this._getDatafile(file, "Version").subscribe((result) => {
                        eventEmitter.emit(result);
                    });
                    return eventEmitter;
                },
                function _getDatafile(file, type) {
                    const eventEmitter = new ng.core.EventEmitter();
                    const fs = require("fs");
                    if (fs.existsSync(file)) {
                        const filename = file.replace(/\\/g, "\\\\");
                        const cmd = "wmic datafile where \"name='" + filename + "'\" get " + type + " /format:list";
                        const child_process = require("child_process");
                        child_process.exec(cmd, (error, stdout) => {
                            let value = stdout.replace(/\n/g, "").split("=")[1].trim();
                            if (value == "") {
                                value = null;
                            }
                            eventEmitter.emit(value);
                            if (error) {
                                alert(error);
                                return;
                            }
                        });
                    } else {
                        setTimeout(() => {
                            eventEmitter.emit(null);
                        }, 0);
                    }
                    return eventEmitter;
                }
            ]
        });
    }
);