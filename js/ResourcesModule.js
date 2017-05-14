define(["CommonModule", "ResourcesView", "ViewCanDeactivate"],
	function (CommonModule, ResourcesView, ViewCanDeactivate) {
		return {
			module: ng.core.NgModule({
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
			}).Class({
				constructor: [
					function ResourcesModule() {

					}
				]
			})
		};
	});