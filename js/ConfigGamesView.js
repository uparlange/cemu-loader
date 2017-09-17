define(["AppUtils", "AppModel", "GameHelper", "RouterManager", "ImageManager"],
	function (AppUtils, AppModel, GameHelper, RouterManager, ImageManager) {
		return AppUtils.getClass({
			constructor: function ConfigGamesView(AppModel, NgZone, Http, GameHelper, RouterManager,
				ImageManager) {
				this.model = AppModel;
				this.gameHelper = GameHelper;
				this.filterValue = null;
				this.comboTypeActive = false;
				this.images = [];
				this.imagesPopupActive = false;
				this._ngZone = NgZone;
				this._http = Http;
				this._routerManager = RouterManager;
				this._imageManager = ImageManager;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("config-games-view"))
			],
			parameters: [
				[AppModel], [ng.core.NgZone], [ng.http.Http], [GameHelper], [RouterManager],
				[ImageManager]
			],
			functions: [
				function ngOnInit() {
					var toto = ";"
				},
				function ngOnDestroy() {
					var toto = ";"
				},
				function onAnimationComplete(filterInput) {
					window.scrollTo(0, 0);
					filterInput.focus();
				},
				function selectImage(image) {
					const extension = image.substr(image.lastIndexOf(".") + 1, 3);
					const imageDestPath = AppUtils.getPicturesPath() + "\\" + this.model.currentGame.id + "_image." + extension;
					const inputs = [
						{ src: image, dest: imageDestPath }
					];
					this._imageManager.download(inputs).subscribe(() => {
						this.model.currentGame.image = imageDestPath;
						// TODO why needed ?
						this._ngZone.run(() => {
							this._routerManager.showConfigParams();
						});
					});
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
					this._routerManager.showConfigParams();
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
				}
			]
		});
	}
);