sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/core/Fragment", 
    "sap/m/MessageToast",
    "sap/ui/export/Spreadsheet",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,Filter,FilterOperator,FilterType,Fragment,MessageToast,Spreadsheet) {
        "use strict";
        var usuario120 = "CONSULT_MM";
        var password120 = "Laredo2023**";
        var url_ini = "";
        var usuario = "CONSULT_MM";
        var password = "Laredo2023**"; 

        return Controller.extend("appss.aplicationss.controller.vNewRequerimientoEpp", {
            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            },
            onInit: function () {
            }, 
            onAfterRendering:async function () {
                // this.getDataListMateriales()
            },
            onPageBack : function () {  
                this.getRouter().getTargets().display("TargetvMain");
                let oModel = this.getView().getModel("myParam");  
                let accionClean = [  
                    {id:"rEpp_fechaReq"},
                    // {id:"rEpp_centro"},
                    // {id:"rEpp_almacen"},
                    {id:"rEpp_codTrab"},
                    {id:"rEpp_nombres"},
                    {id:"rEpp_apellido"},
                    {id:"rEpp_dni"},
                    {id:"rEpp_cargo"},
                    {id:"rEpp_areaTrb"}
                ]
                this.limpiarObjeto(accionClean)
                oModel.setProperty("/materialesSelectReservaTemp",[]);
            }, 
            guardarReservasEpp:async function () { 
                let typeMsm = "information",
                titleMsm = "¿Deseas continuar?"
                let ok = await this.MessageBoxPress(typeMsm,titleMsm)
                if(ok){
                    // console.log("TODO OK")
                    let oModel = this.getView().getModel("myParam");  
                    let materialesSelectReservaTemp = oModel.getProperty("/materialesSelectReservaTemp");
                    console.log("materialesSelectReservaTemp",materialesSelectReservaTemp)
                    let fechaReq = this.cambiarFormatoFecha(this.getView().byId("rEpp_fechaReq").getValue())
                    let centro = this.getView().byId("rEpp_centro").getValue()
                    let almacen = this.getView().byId("rEpp_almacen").getValue()
                    let codTrab = this.getView().byId("rEpp_codTrab").getValue()
                    let dni = this.getView().byId("rEpp_dni").getValue()
                    let cargo = this.getView().byId("rEpp_cargo").getValue()
                    let area = this.getView().byId("rEpp_areaTrb").getValue()
                    
                    let detalle = []
                    for (var valor of materialesSelectReservaTemp) {
                        let obj =  {
                            codigomaterial : valor.MATNR,
                            cantidad : valor.BDMNG,
                            ZIND_CAMBIO : valor.ZIND_CAMBIO,
                            ZIND_VALORADO : "N",
                            ZRES_DEVOLUCION : "N",
                            ZIND_PERDIDA : "N",
                            ZSTATUS : "N",
                        }
                        detalle.push(obj)
                    }
                    let data = {
                        cabecera : {
                            fecharequerimiento : fechaReq,
                            centro,
                            almacen,
                            codigotrabajador : codTrab,
                            almacendestino : "0301",
                            clasemovimiento : "311",
                            dni,
                            cargo,
                            area
                        },
                        detalle 
                    } 
                    // FALTA IMPLEMENTAR LOS CAMBIOS
                    let datastring = JSON.stringify(data);
                    console.log("data",datastring)
                    // debugger
                    var url = url_ini + `https://172.16.22.30:44300/sap/bc/ZSISMART/smart/INS_RESERVA_EPPS/1000/0/A/0/0/0/0?sap-client=120`;
                    var dataRes = this.f_PostJsonData(url, data,true) // envia nuevo registro
                    if(dataRes.cod != undefined && dataRes.cod == 'Error'){
                        MessageToast.show("Solicitud cancelada ocurrio un error"); 
                    }else{ 
                        MessageToast.show("Solicitud exitosa") 
                        oModel.setProperty("/materialesSelectReservaTemp",[]);
                        let ok = await this.MessageBoxPressOneOption("success",`${dataRes.ITAB[0].MESSAGE}`)
                        if(ok){
                            // console.log("TODO OK")
                            // MessageBox.success(`${dataRes.ITAB[0].MESSAGE}`); 
                            this.onPageBack()
                        }
                    }
                    this.cancelAddEpp()
                }else{
                    MessageToast.show("Solicitud cancelada")
                }
                
            },

            //PANEL TABLE DE MATERIALES
            addEpp: function () { 
                this.getView().byId("panelEpp").setVisible(true) 
                this.getDataListMateriales()
            },
            cancelAddEpp: function () {  
                this.getView().byId("panelEpp").setVisible(false)
                this.getView().byId("panelEppEdit").setVisible(false)
                let accionClean = [
                    {id:"epp_codMaterial"},
                    {id:"epp_descripcion"},
                    {id:"epp_cantidad"},
                    {id:"epp_cambio", select: true},
                    {id:"epp_fechaEntrega"}
                ] 
                this.limpiarObjeto(accionClean)
                
            },  
            saveEpp : function () {  
                // console.log("saveRMedico")
                let oModel = this.getView().getModel("myParam");  
                var modelMateriales = "/materialesSelectReservaTemp"
                let list = oModel.getProperty(modelMateriales); 
                // debugger
                var formData = { 
                    BDTER :  this.cambiarFormatoFecha(this.getView().byId("epp_fechaEntrega").getValue()),
                    MATNR : this.getView().byId("epp_codMaterial").getValue(),
                    MARKTX : this.getView().byId("epp_descripcion").getValue(),
                    BDMNG : this.getView().byId("epp_cantidad").getValue(),
                    ZIND_CAMBIO : this.getView().byId("epp_cambio").getSelectedKey(),
                    ZSTAT_LIBER : "N",
                } 
                // console.log("formData",formData)
                list.push(formData)
                oModel.setProperty(modelMateriales,list); 
                // limpiar formulario
                
                this.cancelAddEpp()
            },
            editEpp: function () {  
                this.getDataListMateriales()
                let oModel = this.getView().getModel("myParam");  

                let varPanel = "panelEppEdit"
                let varListTable = "/materialesSelectReservaTemp"
                let varOTableId = "idTableMateriales"
                let varTemEdit = "/temEditMaterial"
                let varTemEditIndice = "/temEditMaterialId" 
                let listTable = oModel.getProperty(varListTable); 

                var oTable = this.getView().byId(varOTableId);
                var indiceEdit = oTable.getSelectedIndices();
                // console.log("indiceEdit",indiceEdit)
                if (indiceEdit.length > 0 && indiceEdit < listTable.length  && listTable[indiceEdit] != undefined) {
                    // console.log("indice seleccionado")
                    this.getView().byId(varPanel).setVisible(true)
                    // console.log("Registro A EDITAR.",listTable[indiceEdit]);
                    oModel.setProperty(varTemEdit,listTable[indiceEdit]);  //nombre de modelo temporal a editar
                    oModel.setProperty(varTemEditIndice,indiceEdit); //indice de modelo temporal a editar
                } else {
                    MessageToast.show("Seleccione un registro");
                // console.log("Índice inválido, SELECCIONEE UNO");
                }  
            },
            saveEditEpp: function () {  
                let oModel = this.getView().getModel("myParam");   
                let varListTable = "/materialesSelectReservaTemp" 
                let varTemEditIndice = "/temEditMaterialId" 

                let list = oModel.getProperty(varListTable);
                let tempEditId = oModel.getProperty(varTemEditIndice);
                var formData = { 
                    // BDTER :  this.cambiarFormatoFecha(this.getView().byId("epp_fechaEntrega").getValue()),
                    // MATNR : this.getView().byId("epp_codMaterial").getValue(),
                    // MARKTX : this.getView().byId("epp_descripcion").getValue(),
                    // BDMNG : this.getView().byId("epp_cantidad").getValue(),
                    // ZIND_CAMBIO : this.getView().byId("epp_cambio").getSelectedKey(),
                    // ZSTAT_LIBER : "N",
                    MATNR : this.getView().byId("edit_epp_codMaterial").getValue(),
                    MARKTX : this.getView().byId("edit_epp_descripcion").getValue(),
                    BDMNG : this.getView().byId("edit_epp_cantidad").getValue(),
                    ZIND_CAMBIO : this.getView().byId("edit_epp_cambio").getSelectedKey(),
                    BDTER :  this.cambiarFormatoFecha(this.getView().byId("edit_epp_fechaEntrega").getValue())  
                } 
                // debugger
                this.actualizarCamposPorIndice(list, tempEditId, formData); 
                oModel.setProperty(varListTable,list); 
                this.cancelAddEpp()
            },
            deleteEpp : function () {  
                let oModel = this.getView().getModel("myParam");  
                let varListTable = "/materialesSelectReservaTemp"   
                let varOTableId = "idTableMateriales"
                let varTemEdit = "/temEditMaterial" 

                let list = oModel.getProperty(varListTable);   
                var oTable = this.getView().byId(varOTableId);
                var indiceAEliminar = oTable.getSelectedIndices();
                // console.log("indiceAEliminar ",indiceAEliminar)
                if (indiceAEliminar >= 0 && indiceAEliminar < list.length && list[indiceAEliminar] != undefined ) {
                    list.splice(indiceAEliminar, 1); // Eliminar 1 elemento desde el índice dado
                    oModel.setProperty(varTemEdit,list);
                    MessageToast.show("Registro eliminado");
                    // console.log("Registro eliminado.");
                } else {
                    MessageToast.show("Seleccione un registro");
                    // console.log("Índice inválido, no se eliminó ningún registro.");
                }  
            },
            buscarTrabajador:  function () {  
                console.log('getListEmpleado')
                var iCodTrabajador = this.getView().byId("rEpp_codTrab").getValue()
                console.log("iCodTrabajador",iCodTrabajador)
                // var oModel = this.getView().getModel("myParam");  
                let dataRes = this.buscarTrabajadorSociedad(iCodTrabajador) 
                console.log('getListEmpleado DATA ',dataRes)
                if(dataRes.cod != undefined && dataRes.cod == 'Error'){
                    // MessageToast.show("Error (" + dataRes.descripcion + ")");
                    MessageToast.show("No encontrado");
                }else{
                    dataRes= dataRes[0]
                    this.getView().byId("rEpp_nombres").setValue(dataRes.NOMBRE)
                    this.getView().byId("rEpp_apellido").setValue(dataRes.APELLIDO)
                    this.getView().byId("rEpp_dni").setValue(dataRes.DNI)
                    this.getView().byId("rEpp_cargo").setValue(dataRes.PUESTO)
                    this.getView().byId("rEpp_areaTrb").setValue(dataRes.AREA) 
                }
            },
            liveDatePersonal:  function () { 
                let accionClean = [  
                    {id:"rEpp_nombres"},
                    {id:"rEpp_apellido"},
                    {id:"rEpp_dni"},
                    {id:"rEpp_cargo"},
                    {id:"rEpp_areaTrb"},
                ]
                this.limpiarObjeto(accionClean)
            },  
            buscarTrabajadorSociedad:  function (iCodTrabajador) {   
                var url = url_ini + `https://172.16.22.30:44300/sap/bc/ZSISMART/smart/GET_LIST_PERSONAL/0/0/${iCodTrabajador}/0/0/0/0?sap-client=120`;
                var dataRes =  this.f_GetJson(url) 
                return dataRes
            },
            getDataListMateriales:  function () { 
                // var oModel = this.getView().getModel("myParam");  
                var centro = this.getView().byId("rEpp_centro").getValue()
                var almacen = this.getView().byId("rEpp_almacen").getValue()
                // var centro = "1001"
                // var almacen = "0300" 
                var url = url_ini + `https://172.16.22.30:44300/sap/bc/ZSISMART/smart/GET_LIST_MAT_EPPS/1000/${centro}/${almacen}/0/0/0/0?sap-client=120`; 
                var dataRes =  this.f_GetJson(url,true) 
                console.log('getDataListMateriales DATA ', dataRes)
                if(dataRes.cod != undefined && dataRes.cod == 'Error'){
                    MessageToast.show("Error (" + dataRes.descripcion + ")");
                }else{
                    // dataRes = dataRes.ITAB
                    const atributosNumeros = { LABST: true };
                    let res = this.transformarAtributosEnString(dataRes,atributosNumeros)
                    console.log('getDataListMateriales DATA ', res)
                    // oModel.setProperty("/dataTab_Material", dataRes);  
                    let oModel = this.getView().getModel("myParam");  
                    oModel.setProperty("/dataTab_Material",res); 
                    
                }
            },
            transformarAtributosEnString: function (array, atributosNumeros) {  
                array.forEach(obj => {
                    for (const atributo in atributosNumeros) {
                    if (typeof obj[atributo] === 'number') {
                        obj[atributo] = obj[atributo].toString();
                    }
                    }
                });
                return array; 
            },
            //input Epps
            changeEpps: function () { 
                let oModel = this.getView().getModel("myParam");  
                oModel.setProperty("/idInputMaterial","epp_codMaterial");
                oModel.setProperty("/idInputMaterialDescrip","epp_descripcion");
                // let listMaterialesReserva = oModel.getProperty("/newListMaterialReserva");
                this._dgEpp().open()
            },
            changeEppsEdit: function () { 
                let oModel = this.getView().getModel("myParam");  
                oModel.setProperty("/idInputMaterial","edit_epp_codMaterial");
                oModel.setProperty("/idInputMaterialDescrip","edit_epp_descripcion");
                // let listMaterialesReserva = oModel.getProperty("/newListMaterialReserva");
                this._dgEpp().open()
            },
            _dgEpp: function () { 
                var e = this.getView();
                if (!this.dgEpp) {
                    this.dgEpp = sap.ui.xmlfragment("idDgEpp", "appss.aplicationss.view.fragments.dgInputEpp", this)
                }
                e.addDependent(this.dgEpp);
                return this.dgEpp 
            },
            dgSearchEpp: function (oEvent) { 
                var sValue = oEvent.getParameter("value");
                // console.log("sValue",sValue)
                let arrSearch = [
                    {atr:"MATNR"},
                    {atr:"MAKTX"},
                    {atr:"LABST"}
                ] 
                this.dialogsSearch(oEvent,arrSearch,sValue)
            }, 
            dgGetCloseEpp: function (oEvent) { 
                let oModel = this.getView().getModel("myParam");  
                // oModel.getProperty("/idInputMaterial","epp_codMaterial");
                let idInput = oModel.getProperty("/idInputMaterial");
                let idInputDesc = oModel.getProperty("/idInputMaterialDescrip");
                // let idInput = "epp_codMaterial"
                this.dialogGetValueClose(oEvent,idInput,idInputDesc)
            },

            // funciones generales para los input con fragment
            dialogsSearch: function (oEvent,arrSearch,sValue) { 
                let comFil = []; 
                for (const objeto of arrSearch) { 
                    let oFilter = new sap.ui.model.Filter (objeto.atr, sap.ui.model.FilterOperator.Contains, sValue);
                    comFil.push(oFilter);
                } 
                // console.log("comFil",comFil);
                var oFilter = new sap.ui.model.Filter({
                    filters: comFil,
                    and: false
                });
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
            dialogGetValueClose: function (oEvent,idInput,idInputDesc) {
                let sDescription,sTitle, oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
                if (!oSelectedItem) { return } 
                sDescription = oSelectedItem.getDescription(); 
                sTitle = oSelectedItem.getTitle(); 
                // debugger
                // console.log("ID INPUT",idInput)
                this.getView().byId(idInput).setValue(sDescription); 
                this.getView().byId(idInputDesc).setValue(sTitle); 
                // this.byId(idInput).setValue(sDescription); 
            }, 
            //FUNCIONES GENERALES
            actualizarCamposPorIndice: function (array, indice, nuevosCampos) {
                if (indice >= 0 && indice < array.length) {
                  array[indice] = { ...array[indice], ...nuevosCampos };
                } else {
                  console.log("Índice fuera de rango");
                }
            },
            f_GetJson: function (p_url_path,client120=false) {
                if(client120){
                    usuario = usuario120;
                    password = password120;
                }
                // return new Promise((resolve, reject) => {    
                    var credentials = btoa(`${usuario}:${password}`);  
                    var res = null;
                    $.ajax({
                        type: "GET",
                        url: p_url_path ,
                        async: false,
                        headers: {
                            "Authorization": `Basic ${credentials}`,
                            "X-Requested-With": "XMLHttpRequest",
                            "Content-Type": "application/json; charset=utf8",
                            "Accept": "application/json"
                            },
                        success: function (result) {
                            // console.log(`DATA ->`,result);
                            // resolve(result.ITAB); 
                            res = result.ITAB
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
                            else {
                            str_error = "Ocurrió un error (" + error.responseText + ")";
                            }
                            // MessageToast.show("Error (" + str_error + ")");
                            var errorObj = {
                                cod : 'Error',
                                descripcion :str_error
                            }
                            // resolve(errorObj);
                            res=  errorObj
                        }
                    });
                    // console.log(`RES ->`,res);
                    return res
                // }); 
            },
            f_PostJsonSinData:  function (url,client120=false) { 
                if(client120){
                    usuario = usuario120;
                    password = password120;
                }
                const credentials = btoa(`${usuario}:${password}`); 
                var res = null
                $.ajax(url, {
					type: "POST",
                    async: false,
					headers: {
                        "Authorization": `Basic ${credentials}`,
						"X-Requested-With": "XMLHttpRequest",
						"Content-Type": "application/json"
					}, 
					success: function (result) {
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
                // console.log(`RES ->`,res);
                return res
            },
            f_PostJsonData:  function (url, dataForm,client120=false) { 
                if(client120){
                    usuario = usuario120;
                    password = password120;
                }
                // console.log("INICIO f_PostJsonData")
                const credentials = btoa(`${usuario}:${password}`); 
                // let url= url_ini + "https://172.16.22.30:44300/sap/bc/ZSISMART/smart/INS_INC/1000/0/0/0/0/0/0?sap-client=120"
                var res = null
                var oVector = dataForm
                $.ajax(url, {
					type: "POST",
                    data: JSON.stringify(oVector),
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
                // console.log(`RES ->`,res);
                return res
            }, 
            cambiarFormatoFecha: function (fecha) {
                let fechaReturn 
                // para saber si el la fecha q se envia es 8/21/23
                if (fecha.includes('/')) {
                    const partes = fecha.split('/');
                    if (partes.length !== 3) {
                        fechaReturn = "";
                    }
    
                    let mes = partes[0];
                    let dia = partes[1];
                    let año = partes[2];
    
                    // Convertir el año a formato completo (yyyy)
                    if (año.length === 2) {
                        const añoActual = new Date().getFullYear().toString();
                        const siglo = añoActual.slice(0, 2);
                        año = siglo + año;
                    }
    
                    // Asegurarse de que los componentes de fecha tengan dos dígitos
                    dia = dia.padStart(2, '0');
                    mes = mes.padStart(2, '0');
    
                    const fechaFormateada = `${año}-${mes}-${dia}`;
                    fechaReturn = fechaFormateada;
                }else{
                    if (fecha.includes('-')) {
                        fechaReturn = fecha; 
                    }else{
                        fechaReturn = "Formato de fecha incorrecto";
                    } 
                }
                return fechaReturn
            },
            fechaActual : function () {  
                var fechaActual = new Date();
                // Obtener día, mes y año
                var dia = fechaActual.getDate();
                var mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son base 0, por lo que se suma 1
                var año = fechaActual.getFullYear();

                // Formatear día y mes para que tengan siempre dos dígitos
                if (dia < 10) {
                    dia = '0' + dia;
                }
                if (mes < 10) {
                    mes = '0' + mes;
                } 
                // Construir la fecha en el formato deseado
                var fechaFormateada = dia + '/' + mes + '/' + año;

                // console.log(fechaFormateada);
                return fechaFormateada
            },
            limpiarObjeto: function (arrayClean) {   
                console.log(`arrayClean: ${arrayClean}`)
                for (const item of arrayClean) {
                    // console.log(`${item.id}`)
                    // if (item.fecha) {
                    //     this.getView().byId(item.id).setDateValue("")
                    // }
                    if (item.select) {
                        this.getView().byId(item.id).setSelectedKey("") 
                    }
                    // this.getView().byId(item.id).setValue("")
                    this.getView().byId(item.id).setValue(''); 
                }
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
            
        });
    });
