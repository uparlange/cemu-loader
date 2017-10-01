define(["AppUtils"],
	function (AppUtils) {
		return AppUtils.getClass({
			constructor: function FilterByPipe() {

			},
			annotations: [
				new ng.core.Pipe({
					name: "filterBy"
				})
			],
			functions: {
				transform: function (list, property, value) {
					if (value == null) {
						return list;
					}
					return list.filter((o) => {
						const v = (property == null) ? o : o[property];
						return (v.toLowerCase().indexOf(value.toLowerCase()) !== -1)
					});
				}
			}
		});
	}
);