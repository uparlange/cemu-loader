define(["CommonModule", "ConfigParamsView"],
	function (CommonModule, ConfigParamsView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigParamsView }
					])
				],
				declarations: [
					ConfigParamsView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function ConfigParamsModule() {

					}
				]
			})
		};
	});