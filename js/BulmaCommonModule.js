define(["AppUtils", "BulmaButtonComponent", "BulmaTabsComponent", "BulmaTabComponent", "BulmaComboboxComponent",
    "BulmaProgressComponent"],
    function (AppUtils, BulmaButtonComponent, BulmaTabsComponent, BulmaTabComponent, BulmaComboboxComponent,
        BulmaProgressComponent) {
        return AppUtils.getClass({
            constructor: function BulmaCommonModule() {

            },
            annotations: [
                new ng.core.NgModule({
                    imports: [
                        ng.common.CommonModule
                    ],
                    declarations: [
                        BulmaButtonComponent,
                        BulmaTabsComponent,
                        BulmaTabComponent,
                        BulmaComboboxComponent,
                        BulmaProgressComponent
                    ],
                    exports: [
                        BulmaButtonComponent,
                        BulmaTabsComponent,
                        BulmaTabComponent,
                        BulmaComboboxComponent,
                        BulmaProgressComponent
                    ]
                })
            ]
        });
    }
);