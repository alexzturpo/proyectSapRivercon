sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("appsp.smartprovider.controller.vAdministrarC", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit() {
            },
            onApp: function () {
                this.getRouter().getTargets().display("TargetApp");
            },
            onIngresar: function () {
                this.getRouter().getTargets().display("Target_v4CotizacionInfo");
            },
            onCrearOrden: function () {
                this.getRouter().getTargets().display("Target_v4ACrearOrden");
            },
        });
    });
