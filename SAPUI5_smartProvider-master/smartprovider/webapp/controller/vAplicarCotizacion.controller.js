sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("appsp.smartprovider.controller.vAplicarCotizacion", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit() {
            },
            onProveedorRFQ: function () {
                this.getRouter().getTargets().display("Target_vProveedorRFQ");
            },
            onAceptarAplicarCotizacion: function () {
                this.getRouter().getTargets().display("Target_vProveedorRFQ");
            },
    });
});