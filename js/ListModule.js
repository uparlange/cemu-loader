define(["AppUtils", "CommonModule", "ListView", "ViewCanDeactivate", "TileRendererComponent",
	"ListRendererComponent"],
	function (AppUtils, CommonModule, ListView, ViewCanDeactivate, TileRendererComponent,
		ListRendererComponent) {
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
						ListView,
						TileRendererComponent,
						ListRendererComponent
					],
					providers: [
						ViewCanDeactivate
					]
				})
			]
		});
	});