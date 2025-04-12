sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("srm.aplication.controller.vAdminUsers", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () { },
        onPageBack: function () { this.getRouter().getTargets().display("vHome") },
        //FRAGMENT Añadir Usuario
        fragmentAddUsuario: function () { this._dgAddUsuario().open() },
        _dgAddUsuario: function () { 
            var e = this.getView();
            if (!this.dgAddUsuario) { this.dgAddUsuario = sap.ui.xmlfragment("idDgAddUsuario", "srm.aplication.view.fragments.adminUser.dgAddUsuario", this) };
            e.addDependent(this.dgAddUsuario);
            return this.dgAddUsuario 
        },
        dgAddUsuarioOk: function () {  
            this.dgCancelAddUsuario() 
        },
        dgCancelAddUsuario: function () { this._dgAddUsuario().close() },
        //FRAGMENT Editar Usuario
        fragmentEditUsuario: function () { this._dgEditUsuario().open() },
        _dgEditUsuario: function () { 
            var e = this.getView();
            if (!this.dgEditUsuario) { this.dgEditUsuario = sap.ui.xmlfragment("idDgEditUsuario", "srm.aplication.view.fragments.adminUser.dgEditUsuario", this) };
            e.addDependent(this.dgEditUsuario);
            return this.dgEditUsuario 
        },
        dgEditUsuarioOk: function () {  
            this.dgCancelEditUsuario() 
        },
        dgCancelEditUsuario: function () { this._dgEditUsuario().close() },
        //FRAGMENT Asignar empresa
        fragmentAssignEmpresa: function () { this._dgAssignEmpresa().open() },
        _dgAssignEmpresa: function () { 
            var e = this.getView();
            if (!this.dgAssignEmpresa) { this.dgAssignEmpresa = sap.ui.xmlfragment("idDgAssignEmpresa", "srm.aplication.view.fragments.adminUser.dgAssignEmpresa", this) };
            e.addDependent(this.dgAssignEmpresa);
            return this.dgAssignEmpresa 
        },
        dgAssignEmpresaOk: function () {  
            this.dgCancelAssignEmpresa() 
        },
        dgCancelAssignEmpresa: function () { this._dgAssignEmpresa().close() },
        //FRAGMENT Asignar proveedor
        fragmentAssignProveedor: function () { this._dgAssignProveedor().open() },
        _dgAssignProveedor: function () { 
            var e = this.getView();
            if (!this.dgAssignProveedor) { this.dgAssignProveedor = sap.ui.xmlfragment("idDgAssignProveedor", "srm.aplication.view.fragments.adminUser.dgAssignProveedor", this) };
            e.addDependent(this.dgAssignProveedor);
            return this.dgAssignProveedor 
        },
        dgAssignProveedorOk: function () {  
            this.dgCancelAssignProveedor() 
        },
        dgCancelAssignProveedor: function () { this._dgAssignProveedor().close() },
        //FRAGMENT Añadir empresar
        fragmentAddEmpresa: function () { this._dgAddEmpresa().open() },
        _dgAddEmpresa: function () { 
            var e = this.getView();
            if (!this.dgAddEmpresa) { this.dgAddEmpresa = sap.ui.xmlfragment("idDgAddEmpresa", "srm.aplication.view.fragments.adminUser.dgAddEmpresa", this) };
            e.addDependent(this.dgAddEmpresa);
            return this.dgAddEmpresa 
        },
        dgAddEmpresaOk: function () {  
            this.dgCancelAddEmpresa() 
        },
        dgCancelAddEmpresa: function () { this._dgAddEmpresa().close() },
        //FRAGMENT Añadir Proveedor
        fragmentAddProveedor: function () { this._dgAddProveedor().open() },
        _dgAddProveedor: function () { 
            var e = this.getView();
            if (!this.dgAddProveedor) { this.dgAddProveedor = sap.ui.xmlfragment("idDgAddProveedor", "srm.aplication.view.fragments.adminUser.dgAddProveedor", this) };
            e.addDependent(this.dgAddProveedor);
            return this.dgAddProveedor 
        },
        dgAddProveedorOk: function () {  
            this.dgCancelAddProveedor() 
        },
        dgCancelAddProveedor: function () { this._dgAddProveedor().close() },

    });
});
