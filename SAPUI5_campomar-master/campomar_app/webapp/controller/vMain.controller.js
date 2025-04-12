sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("appc.campomarapp.controller.vMain", {
            onInit: function () {

            },
            onPress: function () {
                console.log("onPress");
            },
            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                console.log("oItem",oItem.getKey());
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },
        });
    });
