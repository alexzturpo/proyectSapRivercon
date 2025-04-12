sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("adp.aplication.controller.vTrabajadores", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        //NAVEGAR
        onPageBack: function () { this.getRouter().getTargets().display("TargetvMain") },
        navNotificaciones: function () { this.getSplitContObj().to(this.createId("pageNotificaciones")) },
        navConsultas: function () { this.getSplitContObj().to(this.createId("pageConsultas")) },
        navVerificacion: function () { this.getSplitContObj().to(this.createId("pageVerificacion")) },

        //FUNCIONES DE LA VISTA TRABAJADORES
        searchConsultaMotivo: function () { this._dgMotivoConsulta().open() },
        _dgMotivoConsulta: function () { 
            var e = this.getView();
            if (!this.dgMotivoConsulta) { this.dgMotivoConsulta = sap.ui.xmlfragment("idMotivoConsulta", "adp.aplication.view.fragments.dgMotivoConsulta", this) }
            e.addDependent(this.dgMotivoConsulta);
            return this.dgMotivoConsulta 
        },
        dgOkMotivoConsulta: function () { 
            var idMotivo = sap.ui.core.Fragment.byId("idMotivoConsulta", "idMotivo").getValue();
            var idNumContrato = sap.ui.core.Fragment.byId("idMotivoConsulta", "idNumContrato").getValue();
            console.log("DATOS EL FRAGMENT", idMotivo, idNumContrato)
            this._dgMotivoConsulta().close() 
        },
        dgCancelMotivoConsulta: function () { this._dgMotivoConsulta().close() },

        //FUNCIONES GENERALES 
        getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.error("SplitApp object can't be found");
			}
			return result;
		},
        onPressDetailBack: function () {
			this.getSplitContObj().backDetail();
		},
    });
});
