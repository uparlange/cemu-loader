define(["CommonModule", "ListView"],
	function (CommonModule, ListView) {
		return {
			module: ng.core.NgModule({
				imports: [
					CommonModule,
					ng.router.RouterModule.forChild([
						{ path: "", component: ListView }
					])
				],
				declarations: [
					ListView
				],
				providers: [

				]
			}).Class({
				constructor: [
					function ListModule() {

					}
				]
			})
		};
	});