define(["AppUtils", "AppModel", "RouterManager", "CemuManager"],
	function (AppUtils, AppModel, RouterManager, CemuManager) {
		const conf = AppUtils.getComponentConfiguration("config");
		return ng.core.Component(conf).Class({
			constructor: [AppModel, RouterManager, CemuManager,
				function ListView(AppModel, RouterManager, CemuManager) {
					this.model = AppModel;
					this._routerManager = RouterManager;
					this._cemuManager = CemuManager;
					this.searchPanelVisible = false;
					this.searchGameReference = null;
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
			findDbGame: function (game) {
				this.searchGameReference = game;
				this.model.initDbGameList(() => {
					this.searchPanelVisible = true;
				});
			},
			cancelFindDbGame:function() {
				this.searchPanelVisible = false;
			},
			selectDbGame: function (game) {
				this.searchPanelVisible = false;
				this.searchGameReference.id = game.id;
				this.searchGameReference.name = game.name;
				this.searchGameReference.image = game.image;
				this.searchGameReference = null;
			},
			toggleEditGame: function (game) {
				game.edit = (game.edit === true) ? false : true;
			},
			openCemuFileDirectory: function () {
				const item = this.model.config.cemu.file.replace(/"/g, "");
				nw.Shell.showItemInFolder(item);
			},
			openGameFileDirectory: function (game) {
				const item = game.file.replace(/"/g, "");
				nw.Shell.showItemInFolder(item);
			},
			openConfigDirectory: function () {
				const item = AppUtils.getConfigFile();
				nw.Shell.showItemInFolder(item);
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
				this._routerManager.showList();
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