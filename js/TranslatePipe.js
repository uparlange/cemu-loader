define(["AppUtils", "TranslateManager"],
	function (AppUtils, TranslateManager) {
		return AppUtils.getClass({
			constructor: function TranslatePipe(TranslateManager) {
				this._tranlateKey = null;
				this._translateParams = null;
				this._tranlateValue = null;
				this._translateManager = TranslateManager;
				this._onLanguageChangeSubscriber = this._translateManager.onLanguageChange.subscribe(() => {
					this._refreshTranslation();
				});
			},
			annotations: [
				new ng.core.Pipe({
					name: "translate",
					pure: false
				})
			],
			parameters: [
				[TranslateManager]
			],
			functions: {
				transform: function () {
					const args = Array.from(arguments);
					const value = args.shift();
					const params = args.join(",");
					if (this._tranlateKey !== value || this._translateParams !== params) {
						this._tranlateKey = value;
						this._translateParams = params;
						this._refreshTranslation();
					}
					return this._tranlateValue;
				},
				ngOnDestroy: function () {
					this._onLanguageChangeSubscriber.unsubscribe();
				},
				_refreshTranslation: function () {
					let param = this._tranlateKey;
					if (this._translateParams != null) {
						param = {
							key: this._tranlateKey,
							properties: this._translateParams.toString().split(",")
						};
					}
					this._translateManager.getValues([param]).subscribe((translations) => {
						this._tranlateValue = translations[this._tranlateKey];
					});
				}
			}
		});
	});