define(["OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective", "CheckboxDirective"],
	function (OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective, CheckboxDirective) {
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
				AnimatedDirective,
				CheckboxDirective
			],
			exports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.http.HttpModule,
				OrderByPipe,
				FilterByPipe,
				ViewDirective,
				AnimatedDirective,
				CheckboxDirective
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});