define(["AppUtils", "OrderByPipe", "FilterByPipe", "ViewDirective", "AnimatedDirective",
	"CheckboxComponent", "TranslatePipe", "BulmaButtonComponent", "BulmaTabsComponent", "BulmaTabComponent",
	"PanelComponent", "PanelHeaderComponent", "PanelContentComponent", "AccordionComponent", "BulmaComboboxComponent"],
	function (AppUtils, OrderByPipe, FilterByPipe, ViewDirective, AnimatedDirective,
		CheckboxComponent, TranslatePipe, BulmaButtonComponent, BulmaTabsComponent, BulmaTabComponent,
		PanelComponent, PanelHeaderComponent, PanelContentComponent, AccordionComponent, BulmaComboboxComponent) {
		return AppUtils.getClass({
			constructor: function CommonModule() {

			},
			annotations: [
				new ng.core.NgModule({
					imports: [
						ng.common.CommonModule,
						ng.forms.FormsModule,
						ng.http.HttpModule
					],
					declarations: [
						OrderByPipe,
						FilterByPipe,
						ViewDirective,
						AnimatedDirective,
						CheckboxComponent,
						TranslatePipe,
						BulmaButtonComponent,
						BulmaTabsComponent,
						BulmaTabComponent,
						BulmaComboboxComponent,
						PanelComponent,
						PanelHeaderComponent,
						PanelContentComponent,
						AccordionComponent
					],
					exports: [
						ng.common.CommonModule,
						ng.forms.FormsModule,
						ng.http.HttpModule,
						OrderByPipe,
						FilterByPipe,
						ViewDirective,
						AnimatedDirective,
						CheckboxComponent,
						TranslatePipe,
						BulmaButtonComponent,
						BulmaTabsComponent,
						BulmaTabComponent,
						BulmaComboboxComponent,
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