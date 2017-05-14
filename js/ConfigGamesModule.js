define(["CommonModule", "ConfigGamesView", "ViewCanDeactivate"],
	function (CommonModule, ConfigGamesView, ViewCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigGamesView, canDeactivate: [ViewCanDeactivate] }
					])
				],
				declarations: [
					ConfigGamesView
				],
				providers: [
					ViewCanDeactivate
				]
			}).Class({
				constructor: [
					function ConfigGamesModule() {

					}
				]
			})
		};
	});