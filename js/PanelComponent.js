define(["AppUtils", "PanelHeaderComponent", "PanelContentComponent", "AbstractEventManager"],
	function (AppUtils, PanelHeaderComponent, PanelContentComponent, AbstractEventManager) {
		return AppUtils.getClass({
			extends: AbstractEventManager,
			constructor: function PanelComponent() {
				AbstractEventManager.call(this);
				this.id = null;
				this._headerClickSubscriber = null;
			},
			annotations: [
				new ng.core.Component(AppUtils.getComponentConfiguration("panel-component", {
					inputs: ["id"],
					queries: {
						header: new ng.core.ContentChild(PanelHeaderComponent),
						content: new ng.core.ContentChild(PanelContentComponent),
					}
				}))
			],
			functions: [
				function ngAfterViewInit() {
					this._initListeners();
				},
				function ngOnDestroy() {
					this._headerClickSubscriber.unsubscribe();
				},
				function _initListeners() {
					this._headerClickSubscriber = this.header.on("headerClick").subscribe(() => {
						this.emit("panelHeaderClick", { id: this.id });
					});
				}
			]
		});
	}
);