define(["AppUtils", "AppModel", "GameHelper", "RouterManager", "ImageManager"],
	function (AppUtils, AppModel, GameHelper, RouterManager, ImageManager) {
		return AppUtils.getClass({
			constructor: function ConfigGamesView(AppModel, NgZone, HttpClient, GameHelper, RouterManager,
				ImageManager) {
				this.model = AppModel;
				this.gameHelper = GameHelper;
				this.filterValue = null;
				this.comboTypeActive = false;
				this.images = [];
				this.imagesPopupActive = false;
				this._ngZone = NgZone;
				this._http = HttpClient;
				this._routerManager = RouterManager;
				this._imageManager = ImageManager;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-games-view"))
			],
			parameters: [
				[AppModel], [ng.core.NgZone], [ng.common.http.HttpClient], [GameHelper], [RouterManager],
				[ImageManager]
			],
			functions: {
				onAnimationComplete: function (filterInput) {
					window.scrollTo(0, 0);
					filterInput.focus();
				},
				selectImage: function (image) {
					const extension = image.substr(image.lastIndexOf(".") + 1, 3);
					let imageSrc = image;
					let imageDest = AppUtils.getPicturesPath() + "\\" + this.model.currentGame.id + "_image." + extension;
					this._imageManager.download([{ src: imageSrc, dest: imageDest }]).subscribe(() => {
						this.model.currentGame.image = imageDest;
						// TODO why needed ?
						this._ngZone.run(() => {
							this._routerManager.showConfigParams();
						});
					});
				},
				showGameImages: function (game) {
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
				deleteFilter: function () {
					this.filterValue = null;
				},
				cancel: function () {
					this._routerManager.showConfigParams();
				},
				_getImageList: function (id) {
					const htmlparser = require("htmlparser2");
					const eventEmitter = new ng.core.EventEmitter();
					this._http.get("http://www.gametdb.com/WiiU/" + id, { responseType: "text" }).subscribe((result) => {
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
						parser.write(result);
						parser.end();
						eventEmitter.emit(images);
					});
					return eventEmitter;
				}
			}
		});
	}
);