define(["AppUtils", "OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective",
	"CheckboxDirective"],
	function (AppUtils, OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective,
		CheckboxDirective) {
		return AppUtils.getClass({
			constructor: function CommonModule() {

			},
			annotations: [
				new ng.core.NgModule({
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
				})
			]
		});
	}
);