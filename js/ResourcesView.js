define(["AppUtils"],
	function (AppUtils) {
		const conf = AppUtils.getComponentConfiguration("resources");
		return ng.core.Component(conf).Class({
			constructor: [
				function ResourcesView() {

				}
			],
			openLink: function (event) {
				nw.Shell.openExternal(event.target.dataset.link);
			}
		})
	});