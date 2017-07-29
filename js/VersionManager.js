define(["AppUtils"],
	function (AppUtils) {
		return ng.core.Class({
			constructor: [ng.http.Http,
				function VersionManager(Http) {
					this._http = Http;
				}
			],
			init: function () {
				const pkg = AppUtils.getPackageFile();
				this._http.get(AppUtils.getRemotePackageUrl()).subscribe((result) => {
					const remotePkg = result.json();
					if (remotePkg.version > pkg.version) {
						if (confirm("New version " + remotePkg.version + " available, do you want download it ?") === true) {
							nw.Shell.openExternal(AppUtils.getRemoteApplicationDownloadUrl(remotePkg.version));
						}
					}
				});
			}
		});
	});