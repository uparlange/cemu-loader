define(["OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective"],
	function (OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective) {
		return ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.http.HttpModule,
			],
			declarations: [
				OrderByPipe,
				FilterByPipe,
				ViewDirective,
				AnimatedDirective
			],
			exports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.http.HttpModule,
				OrderByPipe,
				FilterByPipe,
				ViewDirective,
				AnimatedDirective
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});