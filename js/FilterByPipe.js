define([],
	function () {
		const conf = {
			name: "filterBy"
		};
		return ng.core.Pipe(conf).Class({
			constructor: [
				function FilterByPipe() {

				}
			],
			transform: function (list, property, value) {
				if(value == null) {
					return list; 
				}
				return list.filter((o) => {
					const v = (property == null) ? o : o[property];
					return (v.toLowerCase().indexOf(value.toLowerCase()) !== -1)
				});
			}
		});
	});