define(["CommonModule", "ConfigGamesView", "AnimationCanDeactivate"],
	function (CommonModule, ConfigGamesView, AnimationCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ConfigGamesView, canDeactivate: [AnimationCanDeactivate] }
					])
				],
				declarations: [
					ConfigGamesView
				],
				providers: [
					AnimationCanDeactivate
				]
			}).Class({
				constructor: [
					function ConfigGamesModule() {

					}
				]
			})
		};
	});