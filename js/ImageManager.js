define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function ImageManager(Http) {
				this._http = Http;
			},
			parameters: [
				[ng.http.Http]
			],
			functions: [
				function init() {

				},
				function download(inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const fs = require("fs");
					const outputs = {};
					inputs.forEach((input) => {
						const extension = input.src.substr(input.src.lastIndexOf(".") + 1, 3);
						this._http.get(input.src, {
							headers: { "Content-Type": "image/" + extension },
							responseType: ng.http.ResponseContentType.ArrayBuffer
						}).subscribe((result) => {
							fs.writeFile(input.dest, new Buffer(result.arrayBuffer()), (error) => {
								outputs[input.src] = (error != null);
								this._treated(inputs, outputs, eventEmitter);
							})
						});
					});
					return eventEmitter;
				},
				function toIco(inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const fs = require("fs");
					const pngToIco = require("png-to-ico");
					const outputs = {};
					inputs.forEach((input) => {
						pngToIco(input.src).then((buf) => {
							fs.writeFileSync(input.dest, buf);
							outputs[input.src] = true;
							this._treated(inputs, outputs, eventEmitter);
						}).catch(() => {
							outputs[input.src] = false;
							this._treated(inputs, outputs, eventEmitter);
						});
					});
					return eventEmitter;
				},
				function tgaToPng(inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const tga2png = require("tga2png");
					const outputs = {};
					inputs.forEach((input) => {
						tga2png(input.src, input.dest).then(() => {
							outputs[input.src] = true;
							this._treated(inputs, outputs, eventEmitter);
						}, () => {
							outputs[input.src] = false;
							this._treated(inputs, outputs, eventEmitter);
						});
					});
					return eventEmitter;
				},
				function _treated(inputs, outputs, eventEmitter) {
					if (Object.keys(outputs).length == inputs.length) {
						eventEmitter.emit(outputs);
					}
				}
			]
		});
	});