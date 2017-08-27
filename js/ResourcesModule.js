define(["AppUtils", "CommonModule", "ResourcesView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, ResourcesView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function ResourcesModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ResourcesView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						ResourcesView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);