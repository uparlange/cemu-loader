define(["AppUtils", "CommonModule", "ListView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, ListView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function ListModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ListView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						ListView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	});