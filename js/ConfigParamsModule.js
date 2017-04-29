define(["CommonModule", "ConfigParamsView", "AnimationCanDeactivate"],
	function (CommonModule, ConfigParamsView, AnimationCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigParamsView, canDeactivate: [AnimationCanDeactivate] }
					])
				],
				declarations: [
					ConfigParamsView
				],
				providers: [
					AnimationCanDeactivate
				]
			}).Class({
				constructor: [
					function ConfigParamsModule() {

					}
				]
			})
		};
	});