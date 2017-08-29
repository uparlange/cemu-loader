define(["AppUtils", "OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective",
	"CheckboxDirective", "TranslatePipe"],
	function (AppUtils, OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective,
		CheckboxDirective, TranslatePipe) {
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
						CheckboxDirective,
						TranslatePipe
					],
					exports: [
						ng.common.CommonModule,
						ng.forms.FormsModule,
						ng.http.HttpModule,
						OrderByPipe,
						FilterByPipe,
						ViewDirective,
						AnimatedDirective,
						CheckboxDirective,
						TranslatePipe
					]
				})
			]
		});
	}
);