sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("swd.aplication.controller.vMain", {
            getRouter: function () { return sap.ui.core.UIComponent.getRouterFor(this); },
            onInit: function () { },
            //RUTAS
            pageExportacion: function () { this.getRouter().getTargets().display("vExportacion") },
            pageImportaciones: function () { this.getRouter().getTargets().display("vImportaciones") },
            pageAdminUsers: function () { this.getRouter().getTargets().display("vAdminUsers") },


            // detailPedido: function () { this.getRouter().getTargets().display("vDetailPedido") },
            // avisoDespachoPublicado: function () { this.getRouter().getTargets().display("vAvisoDespachoPublicado") },
            // pageImportaciones: function () { this.getRouter().getTargets().display("vImportaciones") },
            pageHojaDespachoImportacion: function () { this.getRouter().getTargets().display("vHojaDespachoImportacion") },
        });
    });
