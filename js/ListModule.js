define(["AppUtils", "CommonModule"],
	function (AppUtils, CommonModule) {
		return AppUtils.getLazyModuleClass({
			constructor: function ListModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						CommonModule,
						ng.router.RouterModule.forChild([
							{ path: "maccrazy", loadChildren: AppUtils.getLazyModuleName("MaccrazyRendererModule") },
							{ path: "tile", loadChildren: AppUtils.getLazyModuleName("TileRendererModule") },
							{ path: "list", loadChildren: AppUtils.getLazyModuleName("ListRendererModule") }
						])
					]
				})
			]
		});
	});