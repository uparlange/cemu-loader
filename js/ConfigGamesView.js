define(["AppUtils", "AppModel"],
	function (AppUtils, AppModel) {
		const conf = AppUtils.getComponentConfiguration("config-games");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, ng.router.Router, ng.core.NgZone,
				function ConfigGamesView(AppModel, Router, NgZone) {
					this.model = AppModel;
					this._router = Router;
					this._ngZone = NgZone;
					this.filterValue = null;
					this.comboTypeActive = false;
					this.images = [];
					this.imagesPopupActive = false;
				}
			],
			onAnimationComplete: function (filterInput) {
				window.scrollTo(0, 0);
				filterInput.focus();
			},
			selectImage:function(image) {
				this.model.currentGame.image = image;
				this._showParams();
			},
			showGameImages: function (game) {
				this.images = [];
				this.imagesPopupActive = true;
				this.model.currentGame.id = game.id;
				this.model.currentGame.name = game.name;
				this._getImageList(game.id, (images) => {
					this._ngZone.run(() => {
						this.images = images;
					});
				});
			},
			deleteFilter: function () {
				this.filterValue = null;
			},
			cancel: function () {
				this._showParams();
			},
			_getImageList: function (id, callback) {
				const htmlparser = require("htmlparser2");
				const request = require("request");
				request("http://www.gametdb.com/WiiU/" + id, function (error, response, body) {
					const images = [];
					const parser = new htmlparser.Parser({
						onopentag: (tagname, attributes) => {
							if (tagname == "img") {
								if (attributes.src.indexOf("?") != -1) {
									images.push(attributes.src);
								}
							}
						}
					}, { decodeEntities: true });
					parser.write(body);
					parser.end();
					callback(images);
				});
			},
			_showParams: function () {
				this._router.navigate(["/config/params"]);
			}
		})
	});