define(["AppUtils", "AppModel", "RouterManager", "CemuManager"],
	function (AppUtils, AppModel, RouterManager, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("config");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, RouterManager, CemuManager,
				function ListView(AppModel, RouterManager, CemuManager) {
					this.model = AppModel;
					this._routerManager = RouterManager;
					this._cemuManager = CemuManager;
				}
			],
			ngOnInit: function () {
				this.model.init();
			},
			addGame: function () {
				this.model.addGame();
			},
			removeGame: function (game) {
				this.model.removeGame(game);
			},
			toggleEditGame: function (game) {
				game.edit = (game.edit === true) ? false : true;
			},
			openCemuFileDirectory:function() {
				nw.Shell.showItemInFolder(this.model.config.cemu.file.replace(/"/g, ""));
			},
			openGameImageDirectory:function(game) {
				nw.Shell.showItemInFolder(game.image);
			},
			openGameFileDirectory:function(game) {
				nw.Shell.showItemInFolder(game.file.replace(/"/g, ""));
			},
			openConfigDirectory:function() {
				nw.Shell.showItemInFolder(AppUtils.getConfigFile());
			},
			selectCemuFile: function () {
				this._selectFile().subscribe((file) => {
					this.model.setCemuFile(file);
				});
			},
			selectGameImage: function (game) {
				this._selectFile().subscribe((file) => {
					this.model.setGameImage(game, file);
				});
			},
			selectGameFile: function (game) {
				this._selectFile().subscribe((file) => {
					this.model.setGameFile(game, file);
				});
			},
			saveConfiguration: function () {
				this.model.save();
				this._routerManager.showView("/list");
			},
			launchCemu: function () {
				this._cemuManager.launchCemu();
			},
			_selectFile: function () {
				const eventEmitter = new ng.core.EventEmitter();
				const chooser = document.querySelector("#fileDialog");
				const handler = function () {
					chooser.removeEventListener("change", handler);
					eventEmitter.emit(chooser.value);
				};
				chooser.addEventListener("change", handler);
				chooser.click();
				return eventEmitter;
			}
		})
	});