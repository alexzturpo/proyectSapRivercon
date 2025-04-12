sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("srm.aplication.controller.vHome", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit: function () {
    
            },
            //RUTAS
            pageMain: function () {  this.getRouter().getTargets().display("TargetvMain"); },  
            pageAperturaCaja: function () { this.getRouter().getTargets().display("vAperturaCaja") },
            pageVenta: function () { this.getRouter().getTargets().display("vVenta") },
            pageCierreCaja: function () { this.getRouter().getTargets().display("vCierreCaja") },
            pageGestHojaCobranza: function () { this.getRouter().getTargets().display("vGestHojaCobranza") },
            pageAdminUsers: function () { this.getRouter().getTargets().display("vAdminUsers") },
            //LOGICA 
            
        });
    });
