define(["AppUtils", "TranslateManager"],
	function (AppUtils, TranslateManager) {
		return AppUtils.getClass({
			constructor: function VersionManager(Http, TranslateManager) {
				this._http = Http;
				this._translateManager = TranslateManager;
			},
			parameters: [
				[ng.http.Http], [TranslateManager]
			],
			functions: [
				function init() {
					const pkg = AppUtils.getPackageFile();
					this._http.get(AppUtils.getRemotePackageUrl()).subscribe((result) => {
						const remotePkg = result.json();
						if (remotePkg.version > pkg.version) {
							this._translateManager.getValues([{
								key: "L10N_NEW_VERSION_XXX_AVAILABLE",
								properties: [remotePkg.version]
							}]).subscribe((translations) => {
								if (confirm(translations.L10N_NEW_VERSION_XXX_AVAILABLE) === true) {
									nw.Shell.openExternal(AppUtils.getRemoteApplicationDownloadUrl(remotePkg.version));
								}
							});
						}
					});
				}
			]
		});
	}
);