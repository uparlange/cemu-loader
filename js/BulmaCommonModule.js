define(["AppUtils", "BulmaButtonComponent", "BulmaTabsComponent", "BulmaTabComponent", "BulmaComboboxComponent"],
    function (AppUtils, BulmaButtonComponent, BulmaTabsComponent, BulmaTabComponent, BulmaComboboxComponent) {
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
                        BulmaComboboxComponent
                    ],
                    exports: [
                        BulmaButtonComponent,
                        BulmaTabsComponent,
                        BulmaTabComponent,
                        BulmaComboboxComponent
                    ]
                })
            ]
        });
    }
);