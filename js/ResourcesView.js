define(["AppUtils", "ItemHelper"],
	function (AppUtils, ItemHelper) {
		return AppUtils.getClass({
			constructor: function ResourcesView(HttpClient, ItemHelper) {
				this._http = HttpClient;
				this.itemHelper = ItemHelper;
				this.cemu = {
					label: null,
					data: null
				};
				this.graphicPack = {
					label: null,
					data: null
				};
				this.cemuHook = {
					versions: []
				};
			},
			parameters: [
				[ng.common.http.HttpClient], [ItemHelper]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("resources-view"))
			],
			functions: {
				ngOnInit: function () {
					this._initCemuVersion();
					this._initCemuHookVersion();
					this._initGraphicPackVersion();
				},
				openDataLink: function (event) {
					nw.Shell.openExternal(event.target.dataset.link);
				},
				openLink: function (link) {
					nw.Shell.openExternal(link);
				},
				_initCemuVersion: function () {
					const htmlparser = require("htmlparser2");
					this._http.get("http://cemu.info", { responseType: "text" }).subscribe((result) => {
						const parser = new htmlparser.Parser({
							onopentag: (tagname, attributes) => {
								if (tagname == "a") {
									if (attributes.href.indexOf("releases") != -1) {
										this.cemu.label = "Cemu " + attributes.href.substring(attributes.href.indexOf("_") + 1, attributes.href.length - 4);
										this.cemu.data = attributes.href;
									}
								}
							}
						}, { decodeEntities: true });
						parser.write(result);
						parser.end();
					});
				},
				_initCemuHookVersion: function () {
					const htmlparser = require("htmlparser2");
					let currentLink = null;
					this._http.get("https://sshnuke.net/cemuhook", { responseType: "text" }).subscribe((result) => {
						const parser = new htmlparser.Parser({
							onopentag: (tagname, attributes) => {
								if (tagname == "a") {
									currentLink = attributes.href;
								}
							},
							ontext: (text) => {
								if (currentLink != null && text.indexOf("Cemu hook ") != -1 && text.indexOf(" for") != -1) {
									if (text.indexOf(" - Cemu hook ") == -1) {
										this.cemuHook.versions.push({
											label: text,
											data: currentLink
										});
									}
								}
							},
						}, { decodeEntities: true });
						parser.write(result);
						parser.end();
					});
				},
				_initGraphicPackVersion: function () {
					const htmlparser = require("htmlparser2");
					let currentLink = null;
					this._http.get("https://github.com/slashiee/cemu_graphic_packs/releases", { responseType: "text" }).subscribe((result) => {
						const parser = new htmlparser.Parser({
							onopentag: (tagname, attributes) => {
								if (tagname == "a") {
									if (attributes.href.indexOf("download") !== -1) {
										if (currentLink === null) {
											currentLink = attributes.href;
											this.graphicPack.label = "Graphic Packs " + attributes.href.substring(attributes.href.lastIndexOf("_") + 1, attributes.href.length - 4);
											this.graphicPack.data = "https://github.com" + attributes.href;
										}
									}
								}
							}
						}, { decodeEntities: true });
						parser.write(result);
						parser.end();
					});
				}
			}
		});
	}
);