define(["Apputils", "CommonModule", "MaccrazyRendererView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, MaccrazyRendererView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function MaccrazyRendererModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: MaccrazyRendererView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						MaccrazyRendererView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);