define(["AppUtils", "OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective",
	"CheckboxComponent", "TranslatePipe", "PanelComponent", "PanelHeaderComponent", "PanelContentComponent",
	"AccordionComponent", "BulmaCommonModule"],
	function (AppUtils, OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective,
		CheckboxComponent, TranslatePipe, PanelComponent, PanelHeaderComponent, PanelContentComponent,
		AccordionComponent, BulmaCommonModule) {
		return AppUtils.getClass({
			constructor: function CommonModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						ng.common.CommonModule,
						ng.forms.FormsModule,
						ng.http.HttpModule,
						BulmaCommonModule
					],
					declarations: [
						OrderByPipe,
						FilterByPipe,
						ViewDirective,
						AnimatedDirective,
						CheckboxComponent,
						TranslatePipe,
						PanelComponent,
						PanelHeaderComponent,
						PanelContentComponent,
						AccordionComponent
					],
					exports: [
						ng.common.CommonModule,
						ng.forms.FormsModule,
						ng.http.HttpModule,
						BulmaCommonModule,
						OrderByPipe,
						FilterByPipe,
						ViewDirective,
						AnimatedDirective,
						CheckboxComponent,
						TranslatePipe,
						PanelComponent,
						PanelHeaderComponent,
						PanelContentComponent,
						AccordionComponent
					]
				})
			]
		});
	}
);