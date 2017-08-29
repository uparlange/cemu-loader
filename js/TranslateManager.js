define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function TranslateManager(Http) {
				this.onLanguageChange = new ng.core.EventEmitter();
				this._http = Http;
				this._properties = {};
				this._loading = false;
				this._pendingRequests = [];
				this._currentLang = null;
			},
			parameters: [
				[ng.http.Http]
			],
			functions: [
				function init() {

				},
				function getDefaultLanguage() {
					return "en";
				},
				function setLanguage(lang) {
					if (this._currentLang !== lang) {
						this._currentLang = lang;
						this._loadProperties().subscribe(() => {
							this.onLanguageChange.emit(this._currentLang);
						});
					}
				},
				function getCurrentLanguage() {
					return this._currentLang;
				},
				function getValues(params) {
					const eventEmitter = new ng.core.EventEmitter();
					if (this._loading) {
						this._pendingRequests.push({
							params: params,
							eventEmitter: eventEmitter
						});
					}
					else {
						setTimeout(() => {
							eventEmitter.emit(this._getValues(params));
						}, 0);
					}
					return eventEmitter;
				},
				function _getValues(params) {
					const values = {};
					params.forEach((param) => {
						if (typeof (param) === "object") {
							values[param.key] = this._getValue(param.key, param.properties);
						} else {
							values[param] = this._getValue(param);
						}
					});
					return values;
				},
				function _getValue(key, properties) {
					let value = key;
					if (this._properties[this._currentLang].hasOwnProperty(key)) {
						value = this._properties[this._currentLang][key];
					}
					if (Array.isArray(properties)) {
						properties.forEach((property, index) => {
							value = value.replace("{" + index + "}", property);
						});
					}
					return value;
				},
				function _checkPendingRequests() {
					this._pendingRequests.forEach((request) => {
						const values = this._getValues(request.params);
						request.eventEmitter.emit(values);
					});
					this._pendingRequests = [];
				},
				function _loadProperties() {
					const eventEmitter = new ng.core.EventEmitter();
					if (!this._properties.hasOwnProperty(this._currentLang) && !this._loading) {
						this._loading = true;
						this._http.get("data/locales/" + this._currentLang + ".json").subscribe((data) => {
							this._properties[this._currentLang] = data.json();
							this._loading = false;
							this._checkPendingRequests();
							eventEmitter.emit();
						});
					}
					else {
						setTimeout(() => {
							eventEmitter.emit();
						}, 0);
					}
					return eventEmitter;
				}
			]
		});
	});