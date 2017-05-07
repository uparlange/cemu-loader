define(["OrderByPipe", "FilterByPipe", "AnimationDirective"],
	function (OrderByPipe, FilterByPipe, AnimationDirective) {
		return ng.core.NgModule({
			imports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.http.HttpModule,
			],
			declarations: [
				OrderByPipe,
				FilterByPipe,
				AnimationDirective
			],
			exports: [
				ng.common.CommonModule,
				ng.forms.FormsModule,
				ng.http.HttpModule,
				OrderByPipe,
				FilterByPipe,
				AnimationDirective
			]
		}).Class({
			constructor: [
				function CommonModule() {

				}
			]
		});
	});