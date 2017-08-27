define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function OrderByPipe() {

			},
			annotations: [
				new ng.core.Pipe({
					name: "orderBy"
				})
			],
			functions: [
				function transform(list, property) {
					list.sort((o1, o2) => {
						const v1 = (property == null) ? o1 : o1[property];
						const v2 = (property == null) ? o2 : o2[property];
						if (v1 < v2) {
							return -1;
						} else if (v1 > v2) {
							return 1;
						} else {
							return 0;
						}
					});
					return list;
				}
			]
		});
	}
);