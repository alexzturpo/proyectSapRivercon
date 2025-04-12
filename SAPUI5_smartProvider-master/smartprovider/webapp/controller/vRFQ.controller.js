sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("appsp.smartprovider.controller.vRFQ", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit() {
            },
            onVmain: function () {
                this.getRouter().getTargets().display("TargetvMain");
            },
            onAnalitica: function () {
                var oModel = this.getView().getModel("myParam"); 
                var vetor = [
                    {"vendedor":"NANDAN JAIN PERU","direccion":"Jr 28 De Julio 148","pais":"Peru","correo":"NANDAN@statcounter.com","field5":"","item":"adaptador UPR"},
                    {"vendedor":"DWP GRUPO S.R.L","direccion":"Jr 28 De Julio 537 A, Cercado","pais":"Peru","correo":"DWP@noaa.gov","field5":"","item":"adaptador UPR"},
                    {"vendedor":"FERRO PLAST INTERNATIONAL","direccion":"Av. 28 de Julio 878","pais":"Peru","correo":"FERRO@noaa.gov","field5":"","item":"adaptador UPR"},
                    {"vendedor":"FERROSALT SA","direccion":"Los Cedros 209,San Isidro Lima","pais":"Peru","correo":"FERROSALT@empresa.com","field5":"","item":"acido fosforico"},
                    {"vendedor":"SON PACKS SAC","direccion":"Jr. Caman 616","pais":"Peru","correo":"SONPACKS@empresa.com","field5":"","item":"acido fosforico"},
                    {"vendedor":"VIRU S.A.","direccion":"Jr.Callao 122 1er.Piso Cercado","pais":"Peru","correo":"VIRU@empresa.com","field5":"","item":"acido fosforico"},
                    {"vendedor":"FERTILIZANTES DEL SUR SAC","direccion":"AV De La Poesia 160","pais":"Peru","correo":"FERTILIZANTESUR@empresa.com","field5":"","item":"acido fosforico"},
                    {"vendedor":"EQUILIBRA PERU SA","direccion":"JR Caman 616","pais":"Peru","correo":"EQUILIBRAPERU@empresa.com","field5":"","item":"acido fosforico"}
                ]; 
                oModel.setProperty("/licitadores", vetor); 
            },
            FragmentPublicarRFQ: function () {
                var oView = this.getView();
                if (!this.d1RFQ) {
                    this.d1RFQ = Fragment.load({
                        id: oView.getId(),
                        name: "appsp.smartprovider.view.fragments.publicarRFQ",
                        controller: this
                    }).then(function (oDialog) { 
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.d1RFQ.then(function (oDialog) {
                    oDialog.open(); 
                });
                // this.getRouter().getTargets().display("TargetvMain");
            },
            onAceptarD1: function () { 
                console.log("PUBLICAR");
                this.byId("d1PublicarRFQ").close();
                var oModel = this.getView().getModel("myParam"); 
                var vetor = [{
                    "RFQ": "70000823",
                    "RFQdesc": "Demo RFQ",
                    "codigoCompania": "2270",
                    "oCompra": "Viru",
                    "grupoCompra": "G001",
                    "valorObj": "100 000.00",
                    "fechaLimite": "01/31/2022",
                    "estado": "Publicado"
                }]; 
                oModel.setProperty("/FRQpublicados", vetor);
                this.getRouter().getTargets().display("TargetvMain");
            },
            onCancelarD1: function () {
                // var oModel = this.getView().getModel("myParam"); 
                this.byId("d1PublicarRFQ").close();
            },
            onPublicar: function () {
                console.log("PUBLICAR");
            },
        });
    });
