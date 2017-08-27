define(["AppUtils", "AppModel"],
	function (AppUtils, AppModel) {
		return AppUtils.getClass({
			constructor: function ConfigGamesView(AppModel, Router, NgZone, Http) {
				this.model = AppModel;
				this._router = Router;
				this._ngZone = NgZone;
				this._http = Http;
				this.filterValue = null;
				this.comboTypeActive = false;
				this.images = [];
				this.imagesPopupActive = false;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-games"))
			],
			parameters: [
				[AppModel], [ng.router.Router], [ng.core.NgZone], [ng.http.Http]
			],
			functions: [
				function onAnimationComplete(filterInput) {
					window.scrollTo(0, 0);
					filterInput.focus();
				},
				function selectImage(image) {
					this.model.currentGame.image = image;
					this._showParams();
				},
				function showGameImages(game) {
					this.images = [];
					this.imagesPopupActive = true;
					this.model.currentGame.id = game.id;
					this.model.currentGame.name = game.name;
					this._getImageList(game.id).subscribe((images) => {
						this._ngZone.run(() => {
							this.images = images;
						});
					});
				},
				function deleteFilter() {
					this.filterValue = null;
				},
				function cancel() {
					this._showParams();
				},
				function _getImageList(id) {
					const htmlparser = require("htmlparser2");
					const eventEmitter = new ng.core.EventEmitter();
					this._http.get("http://www.gametdb.com/WiiU/" + id).subscribe((result) => {
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
						parser.write(result.text());
						parser.end();
						eventEmitter.emit(images);
					});
					return eventEmitter;
				},
				function _showParams() {
					this._router.navigate(["/config/params"]);
				}
			]
		});
	}
);