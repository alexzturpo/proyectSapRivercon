sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.pSemanal", {
            onInit: function () {

            }, 
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            pressback: function () {
                this.getRouter().getTargets().display("TargetvMain");
            },
            pressIr: function () {
                this.getRouter().getTargets().display("pSemanalHome");
            },
            onAfterRendering: function () { 
                var oModel = this.getView().getModel("myParam"); 
            }
            
        });
    });
