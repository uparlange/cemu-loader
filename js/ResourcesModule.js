define(["CommonModule", "ResourcesView"],
	function (CommonModule, ResourcesView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ResourcesView }
					])
				],
				declarations: [
					ResourcesView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function ResourcesModule() {

					}
				]
			})
		};
	});