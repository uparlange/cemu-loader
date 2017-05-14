define(["CommonModule", "ListView", "ViewCanDeactivate"],
	function (CommonModule, ListView, ViewCanDeactivate) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ListView, canDeactivate: [ViewCanDeactivate] }
					])
				],
				declarations: [
					ListView
				],
				providers: [
					ViewCanDeactivate
				]
			}).Class({
				constructor: [
					function ListModule() {

					}
				]
			})
		};
	});