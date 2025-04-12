sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.lPep", {
            onInit: function () {
                this.onCheckBoxSelect();
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
            presConsultarForm2: function () {
                var oModel = this.getView().getModel("myParam");
                this.byId("tableLiberar").setVisibleRowCount(7);
                
            },
            presLiberar: function (evt) {
                var oModel = this.getView().getModel("myParam");
                // this.byId("tableLiberar").setVisibleRowCount(0);  

                //liberar dato seleccionado
                //T_liberarPep
                    // var oView = this.getView(); 
                    var oTable = this.getView().byId("tableLiberar");
                    var selectedData = [];
                    //get indices of selected rows, comma-separated
                    var aIndices = oTable.getSelectedIndices();
                    for (var i = 0; i < aIndices.length; i++) {
                        //fetch the data of selected rows by index
                        var tableContext = oTable.getContextByIndex(aIndices[i]);
                        var data = oTable.getModel().getProperty(tableContext.getPath());
                        selectedData.push(data);
                    }
                    console.log(selectedData,"datos seleccionados");
                    // filtrar valores segun la misma labor 
                    var oDataHana = oModel.getProperty("/T_liberarPep");
                    var oMatriz = [];
                    var oVector2 = {};
                    if (selectedData.length !== 0) {
                        if (oDataHana.length !== 0) {
                            for (var j = 0; j < selectedData.length; j++) {
                                for (var i = 0; i < oDataHana.length; i++) {
                                    oVector2 = {}; 
                                    for (const [k, v] of Object.entries(oDataHana[i])) {
                                        if (k === "prog") {
                                            if(selectedData[j].prog !== oDataHana[i].prog ){
                                                oVector2 = oDataHana[i];
                                                oMatriz.push(oVector2);
                                            }
                                        } 
        
                                    }
                                    
                                }
                            }
                        }
                        console.log(oMatriz,"valores");
                        oModel.setProperty("/T_liberarPep", oMatriz); 
                    }
                    console.log("primero haga una busqueda");
            },
            onCheckBoxSelect: function () {
                var valor1 = this.byId("check1").getSelected(); 
                var valor2 = this.byId("check2").getSelected();
                if(valor1){
                    this.byId("check2").setEnabled(false);
                    this.byId("form1E0").setVisible(valor1);
                    this.byId("form1E1").setVisible(valor1);
                    this.byId("form1E2").setVisible(valor1);
                    this.byId("form1E3").setVisible(valor1);
                    this.byId("form1E4").setVisible(valor1);
                    this.byId("form1E5").setVisible(valor1);
                    this.byId("form1E6").setVisible(valor1);
                    this.byId("form1E7").setVisible(valor1); 
                    this.byId("form1E8").setVisible(valor1); 
                }else if(valor2){
                    this.byId("check1").setEnabled(false); 
                    this.byId("form2E0").setVisible(valor2);
                    this.byId("form2E1").setVisible(valor2);
                    this.byId("form2E2").setVisible(valor2);
                    this.byId("form2E3").setVisible(valor2);
                    this.byId("form2E4").setVisible(valor2);
                    this.byId("form2E5").setVisible(valor2);
                    this.byId("form2E6").setVisible(valor2);
                    this.byId("form2E7").setVisible(valor2);
                    this.byId("form2E8").setVisible(valor2);
                    this.byId("form2E9").setVisible(valor2);
                    this.byId("form2E10").setVisible(valor2);
                } else{
                    this.byId("check1").setEnabled(true); 
                    this.byId("check2").setEnabled(true); 
                    this.byId("form1E0").setVisible(valor1);
                    this.byId("form1E1").setVisible(valor1);
                    this.byId("form1E2").setVisible(valor1);
                    this.byId("form1E3").setVisible(valor1);
                    this.byId("form1E4").setVisible(valor1);
                    this.byId("form1E5").setVisible(valor1);
                    this.byId("form1E6").setVisible(valor1);
                    this.byId("form1E7").setVisible(valor1); 
                    this.byId("form1E8").setVisible(valor1); 

                     
                    this.byId("form2E0").setVisible(valor2);
                    this.byId("form2E1").setVisible(valor2);
                    this.byId("form2E2").setVisible(valor2);
                    this.byId("form2E3").setVisible(valor2);
                    this.byId("form2E4").setVisible(valor2);
                    this.byId("form2E5").setVisible(valor2);
                    this.byId("form2E6").setVisible(valor2);
                    this.byId("form2E7").setVisible(valor2);
                    this.byId("form2E8").setVisible(valor2);
                    this.byId("form2E9").setVisible(valor2);
                    this.byId("form2E10").setVisible(valor2);
                }
                
                
                // enabled="false"
                // console.log(valor1,"valor capturado")
                

                 
                
            },
            onAfterRendering: function () { 
                var oModel = this.getView().getModel("myParam"); 
            }
            
        });
    });
