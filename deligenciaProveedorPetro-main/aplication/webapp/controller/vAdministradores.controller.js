sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("adp.aplication.controller.vAdministradores", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {},
        //NAVEGAR
        onPageBack: function () { this.getRouter().getTargets().display("TargetvMain") },
        navManTrabajador: function () { this.getSplitContObj().to(this.createId("pageManTrabajador")) },
        navManFormulario: function () { this.getSplitContObj().to(this.createId("pageManFormulario")) },
        navManProveedores: function () { this.getSplitContObj().to(this.createId("pageManProveedores")) },
        navConTrabajador: function () { this.getSplitContObj().to(this.createId("pageConTrabajador")) },
        navHisModificaciones: function () { this.getSplitContObj().to(this.createId("pageHisModificaciones")) },
        navRegRealizados: function () { this.getSplitContObj().to(this.createId("pageRegRealizados")) },

        //FUNCIONES DE LA VISTA ADMINISTRADOR
        //add trabajador
        addTrabajador: function () { this._dgAddTrabajador().open() },
        _dgAddTrabajador: function () { 
            var e = this.getView();
            if (!this.dgAddTrabajador) { this.dgAddTrabajador = sap.ui.xmlfragment("idMotivoConsulta", "adp.aplication.view.fragments.dgAddTrabajador", this) }
            e.addDependent(this.dgAddTrabajador);
            return this.dgAddTrabajador 
        },
        dgOkAddTrabajador: function () { 
            // var idMotivo = sap.ui.core.Fragment.byId("idMotivoConsulta", "idMotivo").getValue();
            this._dgAddTrabajador().close() 
        },
        dgCancelAddTrabajador: function () { this._dgAddTrabajador().close() },
        // add texto formulario
        addformulario: function () { this._dgAddFormulario().open() },
        _dgAddFormulario: function () { 
            var e = this.getView();
            if (!this.dgAddformulario) { this.dgAddformulario = sap.ui.xmlfragment("idMotivoConsulta", "adp.aplication.view.fragments.dgAddformulario", this) }
            e.addDependent(this.dgAddformulario);
            return this.dgAddformulario 
        },
        dgOkAddFormulario: function () { 
            // var idMotivo = sap.ui.core.Fragment.byId("idMotivoConsulta", "idMotivo").getValue();
            this._dgAddFormulario().close() 
        },
        dgCancelAddFormulario: function () { this._dgAddFormulario().close() },

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
