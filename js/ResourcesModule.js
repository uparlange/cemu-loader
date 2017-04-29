define(["CommonModule", "ResourcesView", "AnimationCanDeactivate"],
	function (CommonModule, ResourcesView, AnimationCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ResourcesView, canDeactivate: [AnimationCanDeactivate] }
					])
				],
				declarations: [
					ResourcesView
				],
				providers: [
					AnimationCanDeactivate
				]
			}).Class({
				constructor: [
					function ResourcesModule() {

					}
				]
			})
		};
	});