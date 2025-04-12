sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.pCampoCarga", {
            onInit: function () {

            }, 
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            handleNav: function(evt) {
                var navCon = this.byId("navCon");
                var target = evt.getSource().data("target");
                if (target) {
                    // var animation = this.byId("animationSelect").getSelectedKey();
                    var animation = "baseSlide";
                    navCon.to(this.byId(target), animation);
                } else {
                    navCon.back();
                }
            },
            pressback: function () {
                this.getRouter().getTargets().display("pCampo");
            }, 
            onAfterRendering: function () { 
                var oModel = this.getView().getModel("myParam"); 

            },
            
            rowSelectionTable2: function (evt) { 
                this.byId("table3").setVisibleRowCount(0); 

                var oModel = this.getView().getModel("myParam");
                var context = evt.getParameters().rowBindingContext; 
                var objeto = context.getObject();
                console.log(objeto,"dato seleccionado");
                
                var oDataHana = oModel.getProperty("/tbl_campoCarga");
                // var oDataHana = tbl_T_LOCAL;
                    var oMatriz = [];
                    var oVector = {};
                    if (oDataHana.length !== 0) {
                        for (var i = 0; i < oDataHana.length; i++) {
                            if(oDataHana[i].operacion === objeto.operacion){
                            oVector = {};
                            oVector = oDataHana[i];
                            oMatriz.push(oVector);
                            }
                        }
                    }
                    console.log(oMatriz,"datos nueva tabla");
                    oModel.setProperty("/DatoSeleccionado", oMatriz);
                // this.getRouter().navTo("FormActivo"); 
            },
            onCargarPlantilla: function () { 
                var oModel = this.getView().getModel("myParam"); 
                var oView = this.getView();
                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "sm.ui5smartagri.view.fragments.CargarPlantilla",
                        controller: this
                    }).then(function (oDialog) { 
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                    // oView.this.byId("fechamodal").setValue(new Date());
                    
                });
                // this.byId("fechamodal").setValue("01/01/2021");
                // this.byId("fechamodal").setDateValue(new Date());
                // var nuevo = this.getView().byId("idClose"); 

            },
            onCloseDialog: function () {
                this.byId("CargarP").close();
            },
            onAcceptDialog: function () {
                var oModel = this.getView().getModel("myParam");
                this.byId("table2").setVisibleRowCount(8);
                this.byId("CargarP").close();
            },
            presAddMaquinaria: function () {
                var oModel = this.getView().getModel("myParam");
                this.byId("table3").setVisibleRowCount(5); 
            },
            //controladores de fragment de cargar archivo
            handleUploadComplete: function(oEvent) {
                var sResponse = oEvent.getParameter("response"),
                    iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
                    sMessage;
    
                if (sResponse) {
                    sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                    MessageToast.show(sMessage);
                }
            },
    
            handleUploadPress: function() {
                var oFileUploader = this.byId("fileUploader");
                if (!oFileUploader.getValue()) {
                    MessageToast.show("Choose a file first");
                    return;
                }
                oFileUploader.checkFileReadable().then(function() {
                    oFileUploader.upload();
                }, function(error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function() {
                    oFileUploader.clear();
                });
            },
            handleTypeMissmatch: function(oEvent) {
                var aFileTypes = oEvent.getSource().getFileType();
                aFileTypes.map(function(sType) {
                    return "*." + sType;
                });
                MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
                                        " no es soportado. Elija uno de los siguientes tipos: " +
                                        aFileTypes.join(", "));
            },
    
            handleValueChange: function(oEvent) {
                MessageToast.show("Press 'Upload File' to upload file '" +
                                        oEvent.getParameter("newValue") + "'");
            }

            //cierra controladores
            
        });
    });