define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function TranslateManager(Http) {
				this.onLanguageChange = new ng.core.EventEmitter();
				this._http = Http;
				this._properties = {};
				this._propertyFilePattern = null;
				this._loading = false;
				this._pendingRequests = [];
				this._currentLang = null;
				this._pendingLanguages = [];
			},
			parameters: [
				[ng.http.Http]
			],
			functions: {
				init: function (params) {
					this._propertyFilePattern = params.propertyFilePattern;
					this.setLanguage(params.language);
				},
				setLanguage: function (lang) {
					if (this._loading) {
						this._pendingLanguages.push(lang);
					} else if (this._currentLang !== lang) {
						this._currentLang = lang;
						this._loadProperties().subscribe(() => {
							this.onLanguageChange.emit(this._currentLang);
							this._checkPendingLanguages();
						});
					}
				},
				getValues: function (params) {
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
				_getValues: function (params) {
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
				_getValue: function (key, properties) {
					let value = key;
					if (this._properties[this._currentLang] !== undefined) {
						if (this._properties[this._currentLang].hasOwnProperty(key)) {
							value = this._properties[this._currentLang][key];
						}
						if (Array.isArray(properties)) {
							properties.forEach((property, index) => {
								value = value.replace("{" + index + "}", property);
							});
						}
					}
					return value;
				},
				_checkPendingRequests: function () {
					this._pendingRequests.forEach((request) => {
						const values = this._getValues(request.params);
						request.eventEmitter.emit(values);
					});
					this._pendingRequests = [];
				},
				_checkPendingLanguages: function () {
					if (this._pendingLanguages.length > 0) {
						this.setLanguage(this._pendingLanguages.shift());
					}
				},
				_loadProperties: function () {
					const eventEmitter = new ng.core.EventEmitter();
					if (!this._properties.hasOwnProperty(this._currentLang) && !this._loading) {
						this._loading = true;
						const path = this._propertyFilePattern.replace("{locale}", this._currentLang);
						this._http.get(path).subscribe((data) => {
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
			}
		});
	});