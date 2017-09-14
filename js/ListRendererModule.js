define(["Apputils", "CommonModule", "ListRendererView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, ListRendererView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function ListRendererModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: ListRendererView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						ListRendererView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);