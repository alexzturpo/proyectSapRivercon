/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "gd/aplicacion/model/models",
        "gd/aplicacion/lib/chart"

    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("gd.aplicacion.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                var oData = {
                    "graficos":[
                        {"name":"valor 1","valor":15},
                        {"name":"valor 2","valor":45},
                        {"name":"valor 3","valor":65},
                        {"name":"valor 4","valor":15},
                        {"name":"valor 5","valor":23},
                        {"name":"valor 6","valor":46},
                        {"name":"valor 7","valor":23},
                        {"name":"valor 8","valor":62},
                        {"name":"valor 9","valor":62},
                        {"name":"valor 10","valor":74},
                    ],
                    "list":[
                        {"name":"Nueva normativa sobre chips EEUU","fecha":"03/09/2022","info":"leer mas.."},
                        {"name":"Nvidia espera que sus ingresos suba","fecha":"23/09/2022","info":"leer mas.."},
                        {"name":"El costo  de vida acutualmente aumentos un 55%","fecha":"29/09/2022","info":"leer mas.."}, 
                    ],
                    "milk":[
                        {"Week":"Week 1 - 4","Revenue":"4685","Cost":"1973","Cost1":"3384","Cost2":"3775"},
                        {"Week":"Week 5 - 8","Revenue":"6500","Cost":"1905","Cost1":"1592","Cost2":"2691"},
                        {"Week":"Week 9 - 12","Revenue":"8905","Cost":"3872","Cost1":"3721","Cost2":"1504"},
                        {"Week":"Week 13 - 16","Revenue":"6398","Cost":"2256","Cost1":"2454","Cost2":"2432"},
                        {"Week":"Week 17 - 20","Revenue":"8604","Cost":"1765","Cost1":"2558","Cost2":"1804"},
                        {"Week":"Week 21 - 24","Revenue":"8650","Cost":"3009","Cost1":"3397","Cost2":"2155"},
                        {"Week":"Week 25- 28","Revenue":"8540","Cost":"1659","Cost1":"3641","Cost2":"2576"},
                        {"Week":"Week 29 - 32","Revenue":"4861","Cost":"2968","Cost1":"2252","Cost2":"1893"},
                        {"Week":"Week 33 - 36","Revenue":"4896","Cost":"3994","Cost1":"2713","Cost2":"2331"},
                        {"Week":"Week 37 - 40","Revenue":"4016","Cost":"2989","Cost1":"2344","Cost2":"2341"},
                        {"Week":"Week 41 - 44","Revenue":"7462","Cost":"2823","Cost1":"1942","Cost2":"2568"},
                        {"Week":"Week 45 - 48","Revenue":"4310","Cost":"2517","Cost1":"2104","Cost2":"3699"}
                        ]
                        

                        
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam");
            }
        });
    }
);