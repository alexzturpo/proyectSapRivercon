sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("adp.aplication.controller.vMain", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit: function () {

            },
            btnLogin: function () {
                let lgProv = this.getView().byId("pProv").getSelected(),
                lgAdmin = this.getView().byId("pAdmin").getSelected(),
                lgTrab = this.getView().byId("pTrab").getSelected()
                console.log("btnLogin")
                // debugger
                if(lgProv){ this.getRouter().getTargets().display("vProveedor");}
                if(lgAdmin){ this.getRouter().getTargets().display("vAdministradores");}
                if(lgTrab){ this.getRouter().getTargets().display("vTrabajadores");}
            },
            vRegisterGo: function () {
                this.getRouter().getTargets().display("vRegister"); 
            }
        });
    });
