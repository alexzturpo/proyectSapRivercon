sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel", 

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,MessageToast,JSONModel) {
        "use strict";
        var usuario = "CONSULT_MM";
        var password = "Laredo2023**";
        var url_ini = "";
        return Controller.extend("spm.aplication.controller.vMain", { 
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit: function () { },
            onAfterRendering:async function () {   

                this.f_listCmb_rucEmpresas();
                this.f_listCmb_rucProveedor();
            },
            //RUTAS
                logoff: function () {  this.getRouter().getTargets().display("TargetvMain"); },
                // PRE REGISTRO DE FACTURA
                pageRegFacturaSinVale: function () { this.getRouter().getTargets().display("vRegFacturaSinVale") },
                pageRegFacturaManualSinVale: function () { this.getRouter().getTargets().display("vRegFacturaManualSinVale") },
    
                //Registro factura sin Vale/HES
                    pageRegFacturaSinAsuntoElectronico: function () { this.getRouter().getTargets().display("vRegFacturaSinAsuntoElectronico") },
                    pageRegFacturaSinAsuntoFisico: function () { this.getRouter().getTargets().display("vRegFacturaSinAsuntoFisico") },
                    
                pageConsultaAnulacionPR: function () { this.getRouter().getTargets().display("vConsultaAnulacionPR") },
                pageConsProgramPago: function () { this.getRouter().getTargets().display("vConsultaProgramacionPago") },
                pageAdminUsers: function () { this.getRouter().getTargets().display("vAdminUsers") },
                pageImpRecepcionConfirmidad: function () { this.getRouter().getTargets().display("vImpRecepcionConfirmidad") },
            //LOGICA 
            goPageConsultaAnulacionPR: function () { 
                let oModel = this.getView().getModel("myParam"); 
                oModel.setProperty("/listConsultaResumenFactura",{}); 
                var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0"
                var dataRes = this.f_AjaxGet(urlAjax)
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR EN LA CONSULTA AL SERVIDOR PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    console.error({urlAjax,  dataRes}); 
                    // return;
                    let data = [
                        {"ID_FACTURA": "1","FC_FEC_REGISTRO":"2023-10-10","TOTAL_IMP": "100.00","NOM_DEM_RAZ_COMERCIAL":"ruc001","NOM_DEM_RAZ_ADQ":"prov001","EM_RUC":"ruc002","US_RUC":"prov002","MONEDA":"PEN","FC_HORA_REGISTRO":"14:00","UBL":"0001","FEC_TEN":"2023-10-10","CO_FACTURA":"F-001","FEC_JOB":"2023-10-10","TOTAL_IGV":"1000.00","FC_FEC_EMISION":"2023-10-10","TIPO_CARGA":"D","ESTADO":"Information"},
                        {"ID_FACTURA": "2","FC_FEC_REGISTRO":"2023-10-12","TOTAL_IMP": "200.00","NOM_DEM_RAZ_COMERCIAL":"ruc004","NOM_DEM_RAZ_ADQ":"prov005","EM_RUC":"ruc005","US_RUC":"prov005","MONEDA":"PEN","FC_HORA_REGISTRO":"25:00","UBL":"0003","FEC_TEN":"2023-10-12","CO_FACTURA":"F-002","FEC_JOB":"2023-10-12","TOTAL_IGV":"100.00","FC_FEC_EMISION":"2023-10-12","TIPO_CARGA":"H","ESTADO":"Warning"}
                    ]   
                    oModel.setProperty("/listFactura",data);
                }else{
                    console.log("DATA",dataRes)
                }

                this.pageConsultaAnulacionPR();
            },
            goPageConsProgramPago: function () { 
                let oModel = this.getView().getModel("myParam"); 
                // oModel.setProperty("/listConsultaResumenFactura",{}); 
                var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0"
                var dataRes = this.f_AjaxGet(urlAjax)
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR EN LA CONSULTA AL SERVIDOR PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    console.error({urlAjax,  dataRes}); 
                    // return;
                    let data = [
                        {"ESTADO": "Information","EM_RUC":"1213124","NOM_DEM_RAZ_ADQ": "nombre Empresa","US_RUC":"98879866","NOM_DEM_RAZ":"nombre empresa 2","TIPO_CARGA":"tipo carga1","REFERENCIA":"13","FC_FEC_EMISION":"2023-10-11","FC_FEC_REGISTRO":"2023-10-10","FEC_CONTABILIZACION":"2023-10-10","FEC_BASE":"2023-10-10","CONDICION_PAGO":"creditos","FEC_VENCIMIENTO":"2023-10-11","FEC_TEN":"2023-10-11","TEXTO_CAB_DOCUMENTO":"2023-10-11 - 12341","FEC_JOB":"2023-10-11","BANCO":"BCP","TOTAL_IMP":"7122.00","MONEDA":"PEN"},
                        {"ESTADO": "Information","EM_RUC":"1213124","NOM_DEM_RAZ_ADQ": "nombre Empresa","US_RUC":"98879866","NOM_DEM_RAZ":"nombre empresa 2","TIPO_CARGA":"tipo carga2","REFERENCIA":"15","FC_FEC_EMISION":"2023-10-10","FC_FEC_REGISTRO":"2023-10-10","FEC_CONTABILIZACION":"2023-10-10","FEC_BASE":"2023-10-10","CONDICION_PAGO":"creditos","FEC_VENCIMIENTO":"2023-10-10","FEC_TEN":"2023-10-10","TEXTO_CAB_DOCUMENTO":"2023-10-10 - 12341","FEC_JOB":"2023-10-10","BANCO":"BCP","TOTAL_IMP":"7122.00","MONEDA":"PEN"},
                    ]   
                    oModel.setProperty("/listResFacReg",data);
                }else{
                    console.log("DATA",dataRes)
                }

                this.pageConsProgramPago();
            },
            //FRAGMENTS PARA LOS MODULOS 
            //FRAGMENT Pre-Registro de Factura
            fragmentRegisterFactura: function () { 
                let aInputs = [
                    {id:"cmb_ruc_empresa", message: "RUC de empresa"},
                    {id:"cmb_ruc_proveedor", message: "RUC del proveedor"}
                ];
                let v_validImputs = this._validacionInputs(aInputs);  
                if(v_validImputs){
                    //carga de comboBox de Código detracción:
                    this._comboBoxCodigosDetraccion();
                    this._dgRegisterFactura().open();
                }  
            },
            _comboBoxCodigosDetraccion: function () { 
                //carga de comboBox de Código detracción:
                let oModel = this.getView().getModel("myParam");

                var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0" 
                var dataRes = this.f_AjaxGet(urlAjax);
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR EN LA CONSULTA AL SERVIDOR LOS 'Códigos de detracción' PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    console.error({urlAjax,  dataRes}); 
                    // return;
                    let data = [
                        { key:"01", value:"01 - Azúcar 10%"},
                        { key:"02", value:"02 - Arroz pilado 3.85%"},
                        { key:"03", value:"03 - Alcohol etílico 10%"},
                        { key:"04", value:"04 - Recursos hidrobiológicos 4%"},
                        { key:"05", value:"05 - Maíz amarillo duro 4%"},
                    ]
                    oModel.setProperty("/listCodigosDetraccion",data); 
                }else{
                    console.log("DATA",dataRes)
                    oModel.setProperty("/listCodigosDetraccion",dataRes); 
                }
            },
            _dgRegisterFactura: function () { 
                var e = this.getView();
                if (!this.dgRegisterFactura) { this.dgRegisterFactura = sap.ui.xmlfragment("idDgRegisterFactura", "spm.aplication.view.fragments.dgRegisterFactura", this) };
                e.addDependent(this.dgRegisterFactura);
                return this.dgRegisterFactura 
            },
            dgRegisterFactura_electronica: function () {  
                this.dgCancelRegisterFactura()
                this.pageRegFacturaSinVale()
            },
            dgRegisterFactura_fisica: function () { 
                this._dgRegisterFactura().close() 
                this.pageRegFacturaManualSinVale()
            },
            dgCancelRegisterFactura: function () { this._dgRegisterFactura().close() },
            //FRAGMENT Pre-Registro de Factura sin sustento
            fragmentRegisterFacturaSinAsunto: function () { 
                let aInputs = [
                    {id:"cmb_ruc_empresa", message: "RUC de empresa"},
                    {id:"cmb_ruc_proveedor", message: "RUC del proveedor"}
                ];
                let v_validImputs = this._validacionInputs(aInputs); 
                // debugger
                if(v_validImputs){
                    this._comboBoxCodigosDetraccion();
                    this._dgRegisterFacturaSinAsuntos().open() ;
                }   
            },
            _dgRegisterFacturaSinAsuntos: function () { 
                var e = this.getView();
                if (!this.dgRegisterFacturaSinAsuntos) { this.dgRegisterFacturaSinAsuntos = sap.ui.xmlfragment("idDgRegisterFacturaSinAsuntos", "spm.aplication.view.fragments.dgRegisterFacturaSinAsuntos", this) };
                e.addDependent(this.dgRegisterFacturaSinAsuntos);
                return this.dgRegisterFacturaSinAsuntos 
            },
            dgRegisterFacturaSinAsuntos_electronica: function () {  
                this.dgCancelRegisterFacturaSinAsuntos()
                this.pageRegFacturaSinAsuntoElectronico()
            },
            dgRegisterFacturaSinAsuntos_fisica: function () { 
                this._dgRegisterFacturaSinAsuntos().close() 
                this.pageRegFacturaSinAsuntoFisico()
            },
            dgCancelRegisterFacturaSinAsuntos: function () { this._dgRegisterFacturaSinAsuntos().close() },
            //////////////////////////////////////////////////////////////////////////////////////////
            //LOGICA DE MAIN CONTROLLER
            funcionEjemplo: function () {
                let oModel = this.getView().getModel("myParam");  
                oModel.setProperty("/docTableIncidente",dataTable);
                let dataTable = oModel.getProperty("/docTableIncidente");

                // var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0"
                var urlAjax = url_ini + "https://172.16.22.30:44300/sap/bc/ZSISMART/smart/GET_LIST_INC/1000/0/0/0/0/0/0?sap-client=120"
                var dataRes = this.f_AjaxPost(urlAjax, newIncidenteForm) // envia nuevo registro
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR EN LA CONSULTA AL SERVIDOR PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    console.error({urlAjax,  dataRes}); return;
                }else{
                    console.log("DATA",dataRes)
                }

                let typeMsm = "information",
                    titleMsm = "¿Deseas continuar?"
                // let ok = await this.MessageBoxPress(typeMsm,titleMsm)
            },
            f_listCmb_rucEmpresas: function () {
                let oModel = this.getView().getModel("myParam");
                var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0";
                var dataRes = this.f_AjaxGet(urlAjax) // envia nuevo registro
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR AL CONSULTAR AL SERVIDOR, PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    // console.error({url:urlAjax,  dataRes}); return;
                    let data = [
                            {RUC_EMP: "20131565659", DESCRIPCION: "TAL S.A"},
                            {RUC_EMP: "20373626466", DESCRIPCION: "INVERSIONES JORDIE S.A."},
                            {RUC_EMP: "20480943687", DESCRIPCION: "AVO PERU S.A.C."}
                        ]   
                    // var oModel = new JSONModel(data);
                    this.getView().setModel(new JSONModel(data),"listaEmpresasUser"); 
                    // console.log("MYMODEL",this.getView().getModel("listaEmpresasUser").getProperty("/")) 
                }else{ 
                    // console.log("DATA",dataRes); 
                    oModel.setProperty("/listaEmpresasUser",dataRes);
                }
            },
            f_change_ruc_empresa: function (evt) {
                var oModel = this.getView().getModel("myParam");  
                let v_item = evt.getSource().getSelectedKey();  
                // console.log("item descrip",evt.getSource().getSelectedItem().mProperties)
                if(!v_item){ MessageToast.show("Seleccione un empresa.");return;}
                let data = {
                    key: v_item,
                    value: evt.getSource().getSelectedItem().mProperties.text
                }
                console.log("item",data)
                oModel.setProperty("/model_selectEmpresa", data); 
            },
            f_change_ruc_proveedor: function (evt) {
                var oModel = this.getView().getModel("myParam"); 
                let v_item = evt.getSource().getSelectedKey();  
                if(!v_item){ MessageToast.show("Seleccione un empresa.");return;}
                let data = {
                    key: v_item,
                    value: evt.getSource().getSelectedItem().mProperties.text
                } 
                oModel.setProperty("/model_selectProveedor", data);
            },
            f_listCmb_rucProveedor: function () {
                // let oModel = this.getView().getModel("myParam");
                var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0";
                var dataRes = this.f_AjaxGet(urlAjax) // envia nuevo registro
                if( dataRes == undefined || dataRes.cod == 'Error'){
                    MessageToast.show("ERROR AL CONSULTAR AL SERVIDOR, PONGASE EN CONTACTO CON EL PROVEEDOR.");
                    // console.error({url:urlAjax,  dataRes}); return;
                    let data = [
                        {RUC_PRO: "20131708191", DESCRIPCION: "AGERSA S.R.L."},
                        {RUC_PRO: "1022067248", DESCRIPCION: "CABEZUDO LARA LUIS ARLES"},
                        {RUC_PRO: "10000827067", DESCRIPCION: "SANTA SARA CHAVEZ TORRES"},
                        {RUC_PRO: "10179097830", DESCRIPCION: "CECILIO R CARRASCO"}
                    ] 
                    // oModel.setProperty("/listaProveedoresUser",dataRes);
                    // this.getView().setModel(oModel, "listaProveedoresUser");
                    this.getView().setModel(new JSONModel(data),"listaProveedoresUser");
                    // console.log("MYMODEL PROV",this.getView().getModel("listaProveedoresUser").getProperty("/")) 
                }else{ 
                    // console.log("DATA",dataRes); 
                    var oModel = new sap.ui.model.json.JSONModel(dataRes);
                    this.getView().byId("Table_DM_List").setModel(oModel, "listaProveedoresUser");
                    // oModel.setProperty("/listaProveedoresUser",dataRes);
                }
            },

            //FUNCIONES GENERALES 
            f_AjaxPost:  function (url, dataForm = undefined) { 
                const credentials = btoa(`${usuario}:${password}`); 
                var res = false
                if(dataForm){ //POST CON DATA
                    $.ajax(url, {
                        type: "POST",
                        data: JSON.stringify(dataForm),
                        async: false,
                        headers: {
                            "Authorization": `Basic ${credentials}`,
                            "X-Requested-With": "XMLHttpRequest",
                            "Content-Type": "application/json"
                        }, 
                        success: function (result) {
                            // console.log('obtuvo consulta POST',result); 
                            res = result 
                        },
                        error: function (error) { 
                            // console.log('error',error); 
                            var str_error = '';
                            if(error.responseJSON != undefined && error.responseJSON.ITAB != undefined) {
                                for(var i=0; i<error.responseJSON.ITAB.length; i++) {
                                    if(str_error == '') { str_error = error.responseJSON.ITAB[i].MESSAGE; }
                                    else { str_error = str_error + "; " + error.responseJSON.ITAB[i].MESSAGE; }
                                }
                            }
                            else { str_error = "Ocurrió un error (" + error.responseText + ")"; } 
                            var errorObj = { cod : 'Error',  descripcion :str_error }
                            res= errorObj
                        }
                    });  
                }else{ //POST SIN DATA
                    $.ajax(url,  {
                        type: "POST",
                        data: JSON.stringify(dataForm),
                        async: false,
                        headers: {
                            "Authorization": `Basic ${credentials}`,
                            "X-Requested-With": "XMLHttpRequest",
                            "Content-Type": "application/json"
                        }, 
                        success: function (result) {
                            // console.log('obtuvo consulta POST',result); 
                            res = result 
                        },
                        error: function (error) { 
                            // console.log('error',error); 
                            var str_error = '';
                            if(error.responseJSON != undefined && error.responseJSON.ITAB != undefined) {
                                for(var i=0; i<error.responseJSON.ITAB.length; i++) {
                                    if(str_error == '') { str_error = error.responseJSON.ITAB[i].MESSAGE; }
                                    else { str_error = str_error + "; " + error.responseJSON.ITAB[i].MESSAGE; }
                                }
                            }
                            else { str_error = "Ocurrió un error (" + error.responseText + ")"; } 
                            var errorObj = { cod : 'Error',  descripcion :str_error }
                            res= errorObj
                        }
                    });  
                }
                return res
            },
            f_AjaxGet: function (url) { 
                var credentials = btoa(`${usuario}:${password}`);  
                var res = null;
                $.ajax({
                    type: "GET",
                    url: url ,
                    async: false,
                    headers: {
                        "Authorization": `Basic ${credentials}`,
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json; charset=utf8",
                        "Accept": "application/json"
                        },
                    success: function (result) { 
                        res = result.ITAB
                    },
                    error: function (error) {  
                        // console.log(error)
                        // debugger
                        var str_error = '';
                        if(error.responseJSON != undefined && error.responseJSON.ITAB != undefined) {
                        for(var i=0; i<error.responseJSON.ITAB.length; i++) {
                            if(str_error == '') { str_error = error.responseJSON.ITAB[i].MESSAGE; }
                            else { str_error = str_error + "; " + error.responseJSON.ITAB[i].MESSAGE; }
                        }
                        }
                        else {
                        str_error = "Ocurrió un error (" + error.responseText + ")";
                        } 
                        var errorObj = {
                            cod : 'Error',
                            descripcion :str_error
                        } 
                        res=  errorObj
                    }
                }); 
                return res 
            },
            MessageBoxPress: function (typeMsm,titleMsm) {
                return new Promise((resolve, reject) => {  
                    MessageBox[typeMsm](titleMsm, {
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            let res = false
                            if(sAction === MessageBox.Action.OK){  
                                res = true
                            }  
                            resolve(res); 
                        }
                    });
                }); 
            },
            MessageBoxPressOneOption: function (typeMsm,titleMsm) {
                return new Promise((resolve, reject) => {  
                    MessageBox[typeMsm](titleMsm, {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            let res = false
                            if(sAction === MessageBox.Action.OK){  
                                res = true
                            }  
                            resolve(res); 
                        }
                    });
                }); 
            },
            _validacionInputs: function (aInputs) {
                let resInputs = true
                let camposVacios = [];
                let camposCompletos = [];

                aInputs.forEach(function(imp) { 
                    let campo = this.getView().byId(imp.id);
                    if (campo.getValue) { // Verificar si es un campo de entrada
                        if (!campo.getValue()) {
                            camposVacios.push(imp);
                        }else{camposCompletos.push(imp);}
                    } else if (campo.getSelectedKey) { // Verificar si es un componente select
                        if (!campo.getSelectedKey()) {
                            camposVacios.push(imp);
                        }else{camposCompletos.push(imp);}
                    }
                }, this);

                // cambiando es etado de los inputs
                let mensajesConcatenados = camposVacios.map(objeto => objeto.message).join(', '); 
                camposVacios.forEach(function(imp) {
                    let campo = this.getView().byId(imp.id);
                    campo.setValueState("Warning");
                    campo.setValueStateText("Completar");
                }, this);
                // debugger
                if(camposVacios.length){
                    MessageToast.show(`Verifica llenar correctamente los campos: ${mensajesConcatenados}`);
                    resInputs = false
                }
                camposCompletos.forEach(function(imp) {
                    let campo = this.getView().byId(imp.id);
                    campo.setValueState("None");
                }, this);

                // if (camposVacios.length === 0) {resInputs = false}
                return resInputs
            },
        });
    });
