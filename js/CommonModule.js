define(["OrderByPipe", "FilterByPipe"],
	function (OrderByPipe, FilterByPipe) {
		return ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule
			],
			declarations: [
				OrderByPipe,
				FilterByPipe
			],
			exports: [
				ng.common.CommonModule,
				ng.http.HttpModule,
				ng.forms.FormsModule,
				OrderByPipe,
				FilterByPipe
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});