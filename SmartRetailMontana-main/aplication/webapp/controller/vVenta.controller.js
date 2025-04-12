sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("srm.aplication.controller.vVenta", {
            getRouter: function () { return sap.ui.core.UIComponent.getRouterFor(this); },
            onInit: function () { },
            //RUTAS
            onPageBack: function () {  this.getRouter().getTargets().display("vHome"); },   
            //LOGICA 

            //FRAGMENTS PARA LOS MODULOS 
            //FRAGMENT buscar pedido
            fragmentSearchPedido: function () { this._dgSearchPedido().open() },
            _dgSearchPedido: function () { 
                var e = this.getView();
                if (!this.dgSearchPedido) { this.dgSearchPedido = sap.ui.xmlfragment("idDgSearchPedido", "srm.aplication.view.fragments.dgSearchPedido", this) };
                e.addDependent(this.dgSearchPedido);
                return this.dgSearchPedido 
            },
            dgSearchPedidoOk: function () {  
                this.dgCancelSearchPedido() 
            },
            dgCancelSearchPedido: function () { this._dgSearchPedido().close() },
            //FRAGMENT NIF
            fragmentNIF: function () { this._dgNIF().open() },
            _dgNIF: function () { 
                var e = this.getView();
                if (!this.dgNIF) { this.dgNIF = sap.ui.xmlfragment("idDgNIF", "srm.aplication.view.fragments.dgNIF", this) };
                e.addDependent(this.dgNIF);
                return this.dgNIF 
            },
            dgNIFOk: function () {  
                this.dgCancelNIF() 
            },
            dgCancelNIF: function () { this._dgNIF().close() },

        });
});
