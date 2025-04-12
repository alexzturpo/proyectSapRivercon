sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.vMain", {
            onInit: function () {

            },
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            pressPdiario: function () {
                this.getRouter().getTargets().display("parteDiario");
            },
            pressPcampo: function () {
                this.getRouter().getTargets().display("pCampo");
            },
            pressPsemanal: function () {
                this.getRouter().getTargets().display("pSemanal");
            },
            pressLpep: function () {
                this.getRouter().getTargets().display("lPep");
            },
            onAfterRendering: function () { 
            }
        });
    });
