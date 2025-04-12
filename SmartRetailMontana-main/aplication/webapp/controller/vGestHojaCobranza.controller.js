sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("srm.aplication.controller.vGestHojaCobranza", {
            getRouter: function () { return sap.ui.core.UIComponent.getRouterFor(this); },
            onInit: function () { },
            //RUTAS
            onPageBack: function () {  this.getRouter().getTargets().display("vHome"); },   
            pageDetailHojaCobranza: function () {  this.getRouter().getTargets().display("vDetailHojaCobranza"); },   
            //LOGICA   

            //FRAGMENTS PARA LOS MODULOS 
            //FRAGMENT Generación de asientos POS tráfico
            fragmentGaPostTrafico: function () { this._dgGaPostTrafico().open() },
            _dgGaPostTrafico: function () { 
                var e = this.getView();
                if (!this.dgGaPostTrafico) { this.dgGaPostTrafico = sap.ui.xmlfragment("idDgGaPostTrafico", "srm.aplication.view.fragments.dgGaPostTrafico", this) };
                e.addDependent(this.dgGaPostTrafico);
                return this.dgGaPostTrafico 
            },
            dgGaPostTraficoOk: function () {  
                this.dgCancelGaPostTrafico() 
            },
            dgCancelGaPostTrafico: function () { this._dgGaPostTrafico().close() },
            //FRAGMENT Generación de asientos POS a banco
            fragmentGaPostBanco: function () { this._dgGaPostBanco().open() },
            _dgGaPostBanco: function () { 
                var e = this.getView();
                if (!this.dgGaPostBanco) { this.dgGaPostBanco = sap.ui.xmlfragment("idDgGaPostBanco", "srm.aplication.view.fragments.dgGaPostBanco", this) };
                e.addDependent(this.dgGaPostBanco);
                return this.dgGaPostBanco 
            },
            dgGaPostBancoOk: function () {  
                this.dgCancelGaPostBanco() 
            },
            dgCancelGaPostBanco: function () { this._dgGaPostBanco().close() },
            //FRAGMENT Generación de asientos a banco - Hermes
            fragmentGaHermesBanco: function () { this._dgGaHermesBanco().open() },
            _dgGaHermesBanco: function () { 
                var e = this.getView();
                if (!this.dgGaHermesBanco) { this.dgGaHermesBanco = sap.ui.xmlfragment("idDgGaHermesBanco", "srm.aplication.view.fragments.dgGaHermesBanco", this) };
                e.addDependent(this.dgGaHermesBanco);
                return this.dgGaHermesBanco 
            }, 
            dgGaHermesBancoOk: function () {  
                this.dgCancelGaHermesBanco() 
            },
            dgCancelGaHermesBanco: function () { this._dgGaHermesBanco().close() },
            cellClickHojaCobranza: function () { this.pageDetailHojaCobranza() },
            
        });
    });
