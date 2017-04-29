define(["CommonModule", "ListView", "AnimationCanDeactivate"],
	function (CommonModule, ListView, AnimationCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ListView, canDeactivate: [AnimationCanDeactivate] }
					])
				],
				declarations: [
					ListView
				],
				providers: [
					AnimationCanDeactivate
				]
			}).Class({
				constructor: [
					function ListModule() {

					}
				]
			})
		};
	});