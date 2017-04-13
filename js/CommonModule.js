define([],
	function () {
		return ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule
			],
			declarations: [

			],
			exports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});