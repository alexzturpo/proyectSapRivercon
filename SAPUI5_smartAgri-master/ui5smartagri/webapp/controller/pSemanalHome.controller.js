sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment", 
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox, MessageToast, Fragment, Filter, FilterOperator, FilterType) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.pSemanalHome", {
            onInit: function () {

            }, 
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            pressback: function () {
                this.getRouter().getTargets().display("pSemanal");
            }, 
            // grabarSemana: function () {
            //     MessageBox.confirm("aqui se ejecuta para grabar");
            // },
            grabarSemana: function (evt) {
                var oView = this.getView();
                var oModel = oView.getModel("myParam");
                var oTable = this.getView().byId("table2");
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
                var selectedData2 = selectedData;
                // var oDataHana = oModel.getProperty("/T_semanaDataselec");
                var oDataHana = oModel.getProperty("/T_semanaData");
                console.log(oDataHana,"datos T_semanaData");
                var oMatriz = [];
                var oVector2 = {};
                var valorV = true;
                if (oDataHana.length !== 0) {
                    for (var j = 0; j < oDataHana.length; j++) { 
                        oVector2 = {}; 
                        valorV = true;
                        for (var i = 0; i < selectedData2.length; i++) {
                                if(oDataHana[j].programacion === selectedData2[i].programacion){
                                    selectedData2[i].colorEstado = "verde"; 
                                    oVector2 = selectedData2[i];
                                    oMatriz.push(oVector2);
                                    valorV = false;
                                    console.log(oVector2,"nuevo dato en  objeto de selectedData2");
                                } 
                        } 
                        if(valorV){ 
                            oVector2 = oDataHana[j];
                            oMatriz.push(oVector2);
                            console.log(oVector2,"nuevo dato en  objeto de oDataHana");
                        }
                        
                    }
                }
                console.log(oMatriz,"valores copiados segun labor");
                oModel.setProperty("/T_semanaDataselec", oMatriz);
                this.onCloseDialog(); 
            },
            presSaveProgramcion: function () {
                var dialogCancelar = new sap.m.Dialog({
                    title: "Confirmación",
                    type: "Message",
                    state: "Information",
                    content: new sap.m.Text({
                        text: "¿Desea grabar esta programación semanal?"
                    }),
                    beginButton: new sap.m.Button({
                        text: "Si",
                        type: "Accept",
                        press: function () {
                            this.grabarSemana();
                            dialogCancelar.close();
                        }.bind(this)
                    }),
                    endButton: new sap.m.Button({
                        text: "No",
                        type: "Negative",
                        press: function () {
                            dialogCancelar.close();
                        }
                    }),
                    afterClose: function (response) {
                        dialogCancelar.destroy();
                    }.bind(this)
                });
                dialogCancelar.open();
            },
            presProgSemanal: function () {  
                var oModel = this.getView().getModel("myParam"); 
                var oView = this.getView();
                if (!this.pDialog) {
                    this.pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "sm.ui5smartagri.view.fragments.programacionSemanal",
                        controller: this
                    }).then(function (oDialog) { 
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
                var nuevo = this.getView().byId("idClose"); 

            },
            f_get_color_by_name: function (p_nombre){
                if(p_nombre == 'rojo'){return "#d22e2e";}
                else if(p_nombre == 'amarillo'){return "#ffff00";}
                else if(p_nombre == 'verde'){return "#008000";}
                else {
                    console.log("new name " +p_nombre );
                    return "#000000";
                }
            },
            onCloseDialog: function () {
                this.byId("programacionSemanal").close();
            },
            presBuscarPSemanal: function () {
                this.byId("tablefragmet").setVisibleRowCount(6);
                var oModel = this.getView().getModel("myParam"); 
                 //iniciando filtrado
                 var oTable = this.getView().byId("tablefragmet");
                 console.log("capturando tabla",oTable);
                 var comFil = [];
                 var inProyecto = this.getView().byId("Iproyecto").getValue();
                 if (inProyecto != "") {
                     var oFilter = new Filter("proyecto", sap.ui.model.FilterOperator.Contains, inProyecto);
                     comFil.push(oFilter);
                 }
                 var inSemana = this.getView().byId("Isemana").getValue();
                 if (inSemana != "") {
                     var oFilter2 = new Filter("semana", FilterOperator.Contains, inSemana);
                     comFil.push(oFilter2);
                 }
                 
                 var iniFecha = this.getView().byId("fi").getValue();
                 var finFecha = this.getView().byId("ff").getValue();
                 
                 if (iniFecha){
                     if (finFecha){
                        //  iniFecha =  this.formatoFeha(iniFecha); 
                        //  finFecha =  this.formatoFeha(finFecha);  
                         //consulta de dos valores 
                         var oFilter3 = new Filter({ path: "finicio", operator: FilterOperator.BT, value1: iniFecha, value2: finFecha});
                         comFil.push(oFilter3);
                     } else {
                        //  iniFecha =  this.formatoFeha(iniFecha); 
                         //consulta de fecha inicio
                         var oFilter3 = new Filter({ path: 'ffin', operator: FilterOperator.EQ, value1: iniFecha });
                         comFil.push(oFilter3);
                     }
                 }else if(finFecha) {
                    //  finFecha =  this.formatoFeha(finFecha);  
                     //consulta hasta fecha final
                     var oFilter3 = new Filter({ path: 'ffin', operator: FilterOperator.LE, value1: finFecha });
                     comFil.push(oFilter3);
                 } 
                 var intipolabor = this.getView().byId("Itipolabor").getValue();
                 if (intipolabor != "") {
                     var oFilter4 = new Filter("tipolabor", sap.ui.model.FilterOperator.Contains, intipolabor);
                     comFil.push(oFilter4);
                 }
                 var inlabor = this.getView().byId("Ilabor").getValue();
                 if (inlabor != "") {
                     var oFilter5 = new Filter("labor", sap.ui.model.FilterOperator.Contains, inlabor);
                     comFil.push(oFilter5);
                 }
                 var inadministracion = this.getView().byId("Iadministracion").getValue();
                 if (inadministracion != "") {
                    var oFilter6 = new Filter("administracion", sap.ui.model.FilterOperator.Contains, inadministracion);
                    comFil.push(oFilter6);
                }
                 var inzona = this.getView().byId("Izona").getValue();
                 if (inzona != "") {
                    var oFilter7 = new Filter("zona", sap.ui.model.FilterOperator.Contains, inzona);
                    comFil.push(oFilter7);
                }
                 var incampo = this.getView().byId("Icampo").getValue();
                 if (incampo != "") {
                    var oFilter8 = new Filter("campo", sap.ui.model.FilterOperator.Contains, incampo);
                    comFil.push(oFilter8);
                }
                 var inquiebre = this.getView().byId("Iquiebre").getValue();
                 if (inquiebre != "") {
                    var oFilter9 = new Filter("quiebre", sap.ui.model.FilterOperator.Contains, inquiebre);
                    comFil.push(oFilter9);
                }
                 console.log("array que filtra",comFil);
                 //filtrado
                 var oFilter = new sap.ui.model.Filter({
                     filters: comFil,
                     and: true
                 });
                 oTable.getBinding("rows").filter(oFilter, FilterType.Application);
            },
            onAcceptDialog: function (evt) {
                var oView = this.getView();
                var oModel = oView.getModel("myParam");
                var oTable = this.getView().byId("tablefragmet");
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
                var oDataHana = oModel.getProperty("/T_semanaData");
                var oMatriz = [];
                var oVector2 = {};
                if (oDataHana.length !== 0) {
                    for (var j = 0; j < selectedData.length; j++) {
                        for (var i = 0; i < oDataHana.length; i++) {
                            oVector2 = {}; 
                            for (const [k, v] of Object.entries(oDataHana[i])) {
                                if (k === "labor") {
                                    if(selectedData[j].labor === oDataHana[i].labor ){
                                        oVector2 = oDataHana[i];
                                    }
                                } 

                            }
                            oMatriz.push(oVector2);
                        }
                    }
                }
                console.log(oMatriz,"valores copiados segun labor");
                oModel.setProperty("/T_semanaDataselec", oMatriz);
                this.onCloseDialog(); 
            },

            onAfterRendering: function () { 
                var oModel = this.getView().getModel("myParam"); 
            }
            
        });
    });
