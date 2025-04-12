sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("spm.aplication.controller.vImpRecepcionConfirmidad", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {   },
        onPageBack: function () { 
            this.getRouter().getTargets().display("vMain");
        }, 
        //FRAGMENT FILTROS 
        btnSeleccionarFiltros: function () { this._dgFilterVales().open() },
        _dgFilterVales: function () { 
            var e = this.getView();
            if (!this.dgFilterVales) { this.dgFilterVales = sap.ui.xmlfragment("idDgFilterVales", "spm.aplication.view.fragments.dgFilterVales", this) };
            e.addDependent(this.dgFilterVales);
            return this.dgFilterVales 
        },
        dgFilterValesOk: function () {  
            this.dgCancelFilterVales() 
        }, 
        dgCancelFilterVales: function () { this._dgFilterVales().close() },
        f_changeFilterFechasDg: function (oEvent) { 
            var bSelected = oEvent.getParameter("selected");
            if (bSelected) {
                // console.log("Código si el CheckBox está seleccionado")
                sap.ui.core.Fragment.byId("idDgFilterVales", "txt_dgFechaDesde").setEnabled(true);  
                sap.ui.core.Fragment.byId("idDgFilterVales", "txt_dgFechaHasta").setEnabled(true);
            } else {
                // console.log("Código si el CheckBox no está seleccionado")  
                sap.ui.core.Fragment.byId("idDgFilterVales", "txt_dgFechaDesde").setEnabled(false);  
                sap.ui.core.Fragment.byId("idDgFilterVales", "txt_dgFechaHasta").setEnabled(false);
            } 
        }, 
        
        
    });
});
