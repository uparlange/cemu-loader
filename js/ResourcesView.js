define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function ResourcesView(Http) {
				this._http = Http;
				this.cemu = {
					label: null,
					link: null
				};
				this.cemuHook = {
					versions: []
				}
			},
			parameters: [
				[ng.http.Http]
			],
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("resources"))
			],
			functions: [
				function ngOnInit() {
					this._initCemuVersion();
					this._initCemuHookVersion();
				},
				function openDataLink(event) {
					nw.Shell.openExternal(event.target.dataset.link);
				},
				function openLink(link) {
					nw.Shell.openExternal(link);
				},
				function downloadCemu() {
					nw.Shell.openExternal(this.cemu.link);
				},
				function _initCemuVersion() {
					const htmlparser = require("htmlparser2");
					this._http.get("http://cemu.info/").subscribe((result) => {
						const parser = new htmlparser.Parser({
							onopentag: (tagname, attributes) => {
								if (tagname == "a") {
									if (attributes.href.indexOf("releases") != -1) {
										this.cemu.label = "Cemu " + attributes.href.substring(attributes.href.indexOf("_") + 1, attributes.href.length - 4);
										this.cemu.link = attributes.href;
									}
								}
							}
						}, { decodeEntities: true });
						parser.write(result.text());
						parser.end();
					});
				},
				function _initCemuHookVersion() {
					const htmlparser = require("htmlparser2");
					let currentLink = null;
					this._http.get("https://sshnuke.net/cemuhook/").subscribe((result) => {
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
											link: currentLink
										});
									}
								}
							},
						}, { decodeEntities: true });
						parser.write(result.text());
						parser.end();
					});
				}
			]
		});
	}
);