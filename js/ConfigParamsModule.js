define(["CommonModule", "ConfigParamsView", "ViewCanDeactivate"],
	function (CommonModule, ConfigParamsView, ViewCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigParamsView, canDeactivate: [ViewCanDeactivate] }
					])
				],
				declarations: [
					ConfigParamsView
				],
				providers: [
					ViewCanDeactivate
				]
			}).Class({
				constructor: [
					function ConfigParamsModule() {

					}
				]
			})
		};
	});