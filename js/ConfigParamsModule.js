define(["AppUtils", "CommonModule", "ConfigParamsView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, ConfigParamsView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function ConfigParamsModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ConfigParamsView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						ConfigParamsView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);