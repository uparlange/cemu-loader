define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function ImageManager(Http) {
				this._http = Http;
			},
			parameters: [
				[ng.http.Http]
			],
			functions: {
				init: function () {

				},
				download: function (inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const fs = require("fs");
					inputs.forEach((input) => {
						const extension = this._getExtention(input.src);
						this._http.get(input.src, {
							headers: { "Content-Type": "image/" + extension },
							responseType: ng.http.ResponseContentType.ArrayBuffer
						}).subscribe((result) => {
							fs.writeFile(input.dest, new Buffer(result.arrayBuffer()), (error) => {
								input.done = (error != null);
								this._treated(inputs, eventEmitter);
							})
						});
					});
					return eventEmitter;
				},
				toIco: function (inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					inputs.forEach((input) => {
						const extension = this._getExtention(input.src);
						switch (extension) {
							case "jpg":
								const jpgToPngDest = input.src.replace(extension, "png");
								this.jpgToPng([{ src: input.src, dest: jpgToPngDest }]).subscribe(() => {
									input.src = jpgToPngDest;
									this._finalizeToIco(inputs, input, eventEmitter);
								});
								break;
							default:
								this._finalizeToIco(inputs, input, eventEmitter);
						}
					});
					return eventEmitter;
				},
				jpgToPng: function (inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const Jimp = require("jimp");
					inputs.forEach((input) => {
						Jimp.read(input.src, (err, src) => {
							if (err) {
								alert(err);
								input.done = false;
								this._treated(inputs, eventEmitter);
							} else {
								src.write(input.dest, () => {
									input.done = true;
									this._treated(inputs, eventEmitter);
								});
							}
						});
					});
					return eventEmitter;
				},
				tgaToPng: function (inputs) {
					const eventEmitter = new ng.core.EventEmitter();
					const tga2png = require("tga2png");
					inputs.forEach((input) => {
						tga2png(input.src, input.dest).then(() => {
							input.done = true;
							this._treated(inputs, eventEmitter);
						}, (err) => {
							alert(err);
							input.done = false;
							this._treated(inputs, eventEmitter);
						});
					});
					return eventEmitter;
				},
				_finalizeToIco: function (inputs, input, eventEmitter) {
					const fs = require("fs");
					const pngToIco = require("png-to-ico");
					const Jimp = require("jimp");
					Jimp.read(input.src, (err, src) => {
						if (err) {
							alert(err);
							input.done = false;
							this._treated(inputs, eventEmitter);
						} else {
							input.src = input.src.replace(".png", "") + "-128x128.png";
							src.resize(128, 128).write(input.src, () => {
								pngToIco(input.src).then((buf) => {
									fs.writeFileSync(input.dest, buf);
									input.done = true;
									this._treated(inputs, eventEmitter);
								}).catch((err) => {
									alert(err);
									input.done = false;
									this._treated(inputs, eventEmitter);
								});
							});
						}
					});
				},
				_getExtention: function (filename) {
					return filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();
				},
				_treated: function (inputs, eventEmitter) {
					let treatedCount = 0;
					inputs.forEach((input) => {
						if (input.done !== undefined) {
							treatedCount++;
						}
					});
					if (treatedCount == inputs.length) {
						eventEmitter.emit(inputs);
					}
				}
			}
		});
	});