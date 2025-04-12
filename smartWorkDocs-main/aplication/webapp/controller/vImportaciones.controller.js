sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("swd.aplication.controller.vImportaciones", {
            getRouter: function () { return sap.ui.core.UIComponent.getRouterFor(this); },
            onInit: function () { },
            //RUTAS
            onPageBack: function () {  this.getRouter().getTargets().display("TargetvMain");  }, 
            pageDetail: function () {  this.getRouter().getTargets().display("vDetailImp");  }, 
            //logica
            onAfterRendering: function() {
                // var oTable = this.byId("tbImportacion");
                // oTable.attachBrowserEvent("dblclick", this.onRowDoubleClick, this);
              },
          
              selectTbImport: function(oEvent) {
                // Tu lógica para manejar la selección de filas aquí
                console.log("EVENTO  SINGLE CLICK")
                this.pageDetail()
                var oTable = this.byId("tbImportacion");
                oTable.attachBrowserEvent("dblclick", this.onRowDoubleClick, this);
              },
          
              onRowDoubleClick: function(oEvent) {
                // Tu lógica para manejar el doble clic en una fila aquí
                console.log("EVENTO  DOBLE CLICK")
              }
        });
    });
