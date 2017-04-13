define(["CommonModule", "ConfigView"],
	function (CommonModule, ConfigView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigView }
					])
				],
				declarations: [
					ConfigView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function ConfigModule() {

					}
				]
			})
		};
	});