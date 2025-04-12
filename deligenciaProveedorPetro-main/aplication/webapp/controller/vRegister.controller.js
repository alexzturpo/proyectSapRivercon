sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("adp.aplication.controller.vRegister", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        onPageBack: function () { 
            this.getRouter().getTargets().display("TargetvMain");
        }
    });
});
