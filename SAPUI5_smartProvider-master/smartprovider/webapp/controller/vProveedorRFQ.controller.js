sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("appsp.smartprovider.controller.vProveedorRFQ", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit() {
            },
            onApp: function () {
                this.getRouter().getTargets().display("TargetApp");
            },
            onCotizacion: function () {
                this.getRouter().getTargets().display("Target_vAplicarCotizacion");
            },
            // FragmentPublicarRFQ: function () {
            //     var oView = this.getView();
            //     if (!this.d1RFQ) {
            //         this.d1RFQ = Fragment.load({
            //             id: oView.getId(),
            //             name: "appsp.smartprovider.view.fragments.publicarRFQ",
            //             controller: this
            //         }).then(function (oDialog) { 
            //             oView.addDependent(oDialog);
            //             return oDialog;
            //         });
            //     }
            //     this.d1RFQ.then(function (oDialog) {
            //         oDialog.open(); 
            //     });
            //     this.getRouter().getTargets().display("TargetvMain");
            // },
            // onAceptarD1: function () { 
            //     console.log("PUBLICAR");
            //     this.byId("d1PublicarRFQ").close();
            // },
            // onCancelarD1: function () {
            //     var oModel = this.getView().getModel("myParam"); 
            //     this.byId("d1PublicarRFQ").close();
            // },
            // onPublicar: function () {
            //     console.log("PUBLICAR");
            // },
        });
    });