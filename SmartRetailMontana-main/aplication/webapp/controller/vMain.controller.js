sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("srm.aplication.controller.vMain", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit: function () {
    
            },
            //RUTAS 
            pageHome: function () {  this.getRouter().getTargets().display("vHome"); },  
            //LOGICA 
            btnLogin: function () {this.pageHome()},
            
        });
    });
