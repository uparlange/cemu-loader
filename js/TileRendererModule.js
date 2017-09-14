define(["Apputils", "CommonModule", "TileRendererView", "ViewCanDeactivate"],
	function (AppUtils, CommonModule, TileRendererView, ViewCanDeactivate) {
		return AppUtils.getLazyModuleClass({
			constructor: function TileRendererModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "", component: TileRendererView, canDeactivate: [ViewCanDeactivate] }
						])
					],
					declarations: [
						TileRendererView
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	}
);