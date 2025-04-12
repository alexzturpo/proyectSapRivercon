sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("afs.aplicacion.controller.vMain", {
            onInit: function () {

            },
            onPress: function () {
                console.log("FUNCIONA EL CLICK")
            },
        });
    });
