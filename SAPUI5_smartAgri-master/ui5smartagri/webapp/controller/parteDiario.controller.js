sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("sm.ui5smartagri.controller.parteDiario", {
            onInit: function () {

            }, 
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            pressback: function () {
                this.getRouter().getTargets().display("TargetvMain");
            },
            onListItemPress: function (oEvent) {
                var oModel = this.getView().getModel("myParam");  
                var getnparte = oEvent.getSource().getIntro(); 

                var oDataHana = oModel.getProperty("/tableDiario"); 
                var oMatriz = [];
                var oVector2 = {};
                if (oDataHana.length !== 0) {
                
                    for (var i = 0; i < oDataHana.length; i++) {
                        oVector2 = {}; 
                        for (const [k, v] of Object.entries(oDataHana[i])) {
                            if (k === "nparte") {
                                if(getnparte === oDataHana[i].nparte ){
                                    oVector2 = oDataHana[i];
                                    oMatriz.push(oVector2);
                                }
                            }  
                        } 
                    }
                }
                console.log(oMatriz,"valores copiados segun nparte");
                oModel.setProperty("/tableDiarioSelec", oMatriz);
                oModel.setProperty("/nrParte", getnparte);
            },
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    // var filter = new Filter("Name", FilterOperator.Contains, sQuery);
                    aFilters.push(new Filter("nparte", FilterOperator.Contains, sQuery));
                    aFilters.push(new Filter("title", FilterOperator.Contains, sQuery));
                    aFilters.push(new Filter("centro", FilterOperator.Contains, sQuery)); 
                }
    
                // update list binding
                var oList = this.byId("list1");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters); 
            },
            onAfterRendering: function () { 
                var oModel = this.getView().getModel("myParam"); 
            }
            
        });
    });
