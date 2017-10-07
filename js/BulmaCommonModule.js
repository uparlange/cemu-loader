define(["AppUtils", "BulmaButtonComponent", "BulmaTabsComponent", "BulmaTabComponent", "BulmaComboboxComponent",
    "BulmaProgressComponent", "ImageComponent"],
    function (AppUtils, BulmaButtonComponent, BulmaTabsComponent, BulmaTabComponent, BulmaComboboxComponent,
        BulmaProgressComponent, ImageComponent) {
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
                        BulmaProgressComponent,
                        ImageComponent
                    ],
                    exports: [
                        BulmaButtonComponent,
                        BulmaTabsComponent,
                        BulmaTabComponent,
                        BulmaComboboxComponent,
                        BulmaProgressComponent,
                        ImageComponent
                    ]
                })
            ]
        });
    }
);