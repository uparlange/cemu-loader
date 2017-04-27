define(["CommonModule", "ConfigGamesView"],
	function (CommonModule, ConfigGamesView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigGamesView }
					])
				],
				declarations: [
					ConfigGamesView
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