sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("swd.aplication.controller.vExportacion", {
            getRouter: function () { return sap.ui.core.UIComponent.getRouterFor(this); },
            onInit: function () { },
            //RUTAS 
            onPageBack: function () {  this.getRouter().getTargets().display("TargetvMain");  },
            pageDetailExp: function () { this.getRouter().getTargets().display("vDetailExp") }, 
            //logica
            selectTbExport: function(oEvent) {
                // Tu lógica para manejar la selección de filas aquí
                console.log("EVENTO  SINGLE CLICK")
                this.pageDetailExp() 
              },
        });
    });
