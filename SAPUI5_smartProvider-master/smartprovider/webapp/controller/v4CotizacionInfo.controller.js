sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("appsp.smartprovider.controller.v4CotizacionInfo", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit() {
            },
            onAdministrarC: function () {
                this.getRouter().getTargets().display("Target_vAdministrarC");
            },
            onCrearOrden: function () {
                this.getRouter().getTargets().display("Target_v4ACrearOrden");
            },
    });
});