sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel", 
],
function (Controller,MessageBox,MessageToast,JSONModel) {
    "use strict";
	var usuario = "CONSULT_MM";
	var password = "Laredo2023**";
	var url_ini = "";

    return Controller.extend("adp.aplication.controller.vRegFacturaManualSinVale", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        onPageBack: function () { 
            this.getRouter().getTargets().display("vMain");
        },
		f_changeRazonSocial: function (value) { 
			console.log("f_changeRazonSocial", value)
			let res = value.split("-")[1].trimLeft();
			return res
		},
        //FRAGMENTS PARA LOS MODULOS 
        //FRAGMENT Asignar posiciones
        fragmentAsigPosiciones: function () { 
			let oModel = this.getView().getModel("myParam");
			//cargar  data al fragment
			var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0";
			var dataRes = this.f_AjaxGet(urlAjax) // envia nuevo registro
			if( dataRes == undefined || dataRes.cod == 'Error'){
				MessageToast.show("ERROR AL CONSULTAR AL SERVIDOR, PONGASE EN CONTACTO CON EL PROVEEDOR.");
				// console.error({url:urlAjax,  dataRes}); return;
				let data = [
					{fechaIngreso:"2019-12-06", guiaRemision:"",docMat:"5000015981", posiciones:"1", ordenCompra:"4400001049", cantidad:"0.000", importe:"616.67 PEN"}, 
					{fechaIngreso:"2019-12-06", guiaRemision:"",docMat:"5000016744", posiciones:"1", ordenCompra:"4400001049", cantidad:"0.000", importe:"616.67 PEN"}, 
					{fechaIngreso:"2020-01-31", guiaRemision:"",docMat:"5000027823", posiciones:"1", ordenCompra:"4400002507", cantidad:"0.000", importe:"2100.00 PEN"}, 
					{fechaIngreso:"2020-01-31", guiaRemision:"",docMat:"5000027826", posiciones:"1", ordenCompra:"4400002510", cantidad:"0.000", importe:"910.00 PEN"}, 
					{fechaIngreso:"2020-01-31", guiaRemision:"",docMat:"5000028478", posiciones:"1", ordenCompra:"4400002507", cantidad:"0.000", importe:"2100.00 PEN"}, 
				]   
				oModel.setProperty("/dataTableAsignarPosiciones",data);
				// var oModel = new JSONModel(data);
				// this.getView().setModel(new JSONModel(data),"dataTableAsignarPosiciones"); 
				this._dgAsigPosiciones().open();
				// console.log("MYMODEL",this.getView().getModel("listaEmpresasUser").getProperty("/")) 
			}else{ 
				// console.log("DATA",dataRes); 
				oModel.setProperty("/dataTableAsignarPosiciones",dataRes);
				this._dgAsigPosiciones().open() 
			} 
		},
        _dgAsigPosiciones: function () { 
            var e = this.getView();
            if (!this.dgAsigPosiciones) { this.dgAsigPosiciones = sap.ui.xmlfragment("idDgAsigPosiciones01", "spm.aplication.view.fragments.dgAsigPosiciones", this) };
            e.addDependent(this.dgAsigPosiciones);
            return this.dgAsigPosiciones 
        },
        dgAsigPosicionesOk: function () {  
            this.dgCancelAsigPosiciones() 
        },
        dgCancelAsigPosiciones: function () { this._dgAsigPosiciones().close() },
        dgSearchAsigPosiciones: function () {  
			let idTable = "table_idAsignarPosiciones"
			let idFragment = "idDgAsigPosiciones01"
			let objBusqueda = [
				{id:"txt_fechaIngreso",tabAtr:"fechaIngreso", iFecha:true},
				{id:"txt_docHoja",tabAtr:"docMat"},
				{id:"txt_guiaEmision",tabAtr:"guiaRemision",},
				{id:"txt_ordenCompra",tabAtr:"ordenCompra"},
			] 
			let oTable = sap.ui.core.Fragment.byId(idFragment,idTable);
			let comFil = this.comFilBusqueda(objBusqueda,idFragment)  
			let oFilter = new sap.ui.model.Filter({ filters: comFil, and: true }); 
			 oTable.getBinding("items").filter(oFilter, sap.ui.model.FilterType.Application); 
		},
		dgCleanSearchAsigPosiciones: function () { 
			let objClean = [
				{id:"txt_fechaIngreso"},
				{id:"txt_docHoja"},
				{id:"txt_guiaEmision"},
				{id:"txt_ordenCompra"}
			] 
			this.cleanForm(objClean,"idDgAsigPosiciones01");
			this.dgSearchAsigPosiciones();
		},
		

        //FRAGMENT Documentos
        fragmentDocumentos: function () {
            let oModel = this.getView().getModel("myParam");
			//cargar  data al fragment
			var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0";
			var dataRes = this.f_AjaxGet(urlAjax) // envia nuevo registro
			if( dataRes == undefined || dataRes.cod == 'Error'){
				MessageToast.show("ERROR AL CONSULTAR AL SERVIDOR, PONGASE EN CONTACTO CON EL PROVEEDOR.");
				// console.error({url:urlAjax,  dataRes}); return;
				// let data = [
				// 	{nombre:"doc01", fechaMod:"2023-10-10",horaMod:"14:00", size:"68", format:"pdf"},
				// ]   
				// new JSONModel()
				// this.getView().setModel(new JSONModel(data),"tableDocsFacturas"); 
				oModel.setProperty("/tableDocsFacturas",[]); 
				oModel.setProperty("/tableDocsGuiaRemision",[]); 
				oModel.setProperty("/tableDocsOtros",[]); 
				this._dgDocumentos().open(); 
			}else{ 
				// console.log("DATA",dataRes); 
				oModel.setProperty("/tableDocsFacturas",dataRes);
				oModel.setProperty("/tableDocsGuiaRemision",dataRes); 
				oModel.setProperty("/tableDocsOtros",dataRes); 
				this._dgDocumentos().open() 
			} 
        },
        _dgDocumentos: function () { 
            var e = this.getView();
            if (!this.dgDocumentos) { this.dgDocumentos = sap.ui.xmlfragment("idDgDocumentos01", "spm.aplication.view.fragments.dgDocumentos", this) };
            e.addDependent(this.dgDocumentos);
            return this.dgDocumentos 
        },
        dgDocumentosOk: function () {  
            this.dgCancelDocumentos() 
        },
        dgCancelDocumentos: function () { this._dgDocumentos().close() },
		btn_AddDocsFacturas: function () { 
			let fragment = "idDgDocumentos01"; 
			let idImput = "file_AddDocsFacturas"; 
			let nameModel = "/tableDocsFacturas"; 
			let oFile = sap.ui.core.Fragment.byId(fragment, idImput).oFileUpload.files[0];
			if (oFile) {
				// funcion para subir el archivo 
				// if(!this.f_fileUp(oFile)) {MessageToast.show("Error al subir el archivo. PONGASE EN CONTACTO CON EL PROVEEDOR.");return;}
				let oFileProperties = {
					nombre: oFile.name,                     // Nombre del archivo
					fechaMod: this.cambiarFormatoFecha(new Date(oFile.lastModified),true), // Fecha de modificación
					horaMod: this.getDateTimeHora(new Date(oFile.lastModified)), // Fecha de modificación
					size: oFile.size,                     // Tamaño del archivo en bytes
					format: oFile.type                      // Tipo de archivo (mime type)
				}; 
				// console.log("oFileProperties",oFileProperties);
				let oModel = this.getView().getModel("myParam");
				let v_modelo = oModel.getProperty(nameModel);
				v_modelo.push(oFileProperties);
				oModel.setProperty(nameModel,v_modelo);
				// Limpiar imput de archivos
				let objClean = [ {id:idImput}]; 
				this.cleanForm(objClean,fragment);
			}else{MessageToast.show("Seleccione algun archivo.");} 
		},  
        btn_AddDocsGuiaRemision: function () { 
			let fragment = "idDgDocumentos01"; 
			let idImput = "file_AddDocsGuiaRemision"; 
			let nameModel = "/tableDocsGuiaRemision"; 
			let oFile = sap.ui.core.Fragment.byId(fragment, idImput).oFileUpload.files[0];
			if (oFile) {
				// funcion para subir el archivo 
				// if(!this.f_fileUp(oFile)) {MessageToast.show("Error al subir el archivo. PONGASE EN CONTACTO CON EL PROVEEDOR.");return;}
				let oFileProperties = {
					nombre: oFile.name,                     // Nombre del archivo
					fechaMod: this.cambiarFormatoFecha(new Date(oFile.lastModified),true), // Fecha de modificación
					horaMod: this.getDateTimeHora(new Date(oFile.lastModified)), // Fecha de modificación
					size: oFile.size,                     // Tamaño del archivo en bytes
					format: oFile.type                      // Tipo de archivo (mime type)
				}; 
				// console.log("oFileProperties",oFileProperties);
				let oModel = this.getView().getModel("myParam");
				let v_modelo = oModel.getProperty(nameModel);
				v_modelo.push(oFileProperties);
				oModel.setProperty(nameModel,v_modelo);
				// Limpiar imput de archivos
				let objClean = [ {id:idImput}]; 
				this.cleanForm(objClean,fragment);
			}else{MessageToast.show("Seleccione algun archivo.");} 
		},
        btnAddDocsOtros: function () { 
			let fragment = "idDgDocumentos01"; 
			let idImput = "file_AddDocsOtros"; 
			let nameModel = "/tableDocsOtros"; 
			let oFile = sap.ui.core.Fragment.byId(fragment, idImput).oFileUpload.files[0];
			if (oFile) {
				// funcion para subir el archivo 
				// if(!this.f_fileUp(oFile)) {MessageToast.show("Error al subir el archivo. PONGASE EN CONTACTO CON EL PROVEEDOR.");return;}
				let oFileProperties = {
					nombre: oFile.name,                     // Nombre del archivo
					fechaMod: this.cambiarFormatoFecha(new Date(oFile.lastModified),true), // Fecha de modificación
					horaMod: this.getDateTimeHora(new Date(oFile.lastModified)), // Fecha de modificación
					size: oFile.size,                     // Tamaño del archivo en bytes
					format: oFile.type                      // Tipo de archivo (mime type)
				}; 
				// console.log("oFileProperties",oFileProperties);
				let oModel = this.getView().getModel("myParam");
				let v_modelo = oModel.getProperty(nameModel);
				v_modelo.push(oFileProperties);
				oModel.setProperty(nameModel,v_modelo);
				// Limpiar imput de archivos
				let objClean = [ {id:idImput}]; 
				this.cleanForm(objClean,fragment);
			}else{MessageToast.show("Seleccione algun archivo.");} 
		},  
		f_fileUp: function (file) { 
			var urlAjax = url_ini + "/*/*/*/0/0/0/0/0/0/0" 
			var dataRes = this.f_AjaxPost(urlAjax,file);
			if( dataRes == undefined || dataRes.cod == 'Error'){
				console.error({urlAjax,  dataRes}); 
				return false; 
			}else{  return true; }
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
		comFilBusqueda: function (miArray,fragment=false) {
			// item.iSelect
			// item.iFecha
			let result = [];
			miArray.forEach(item => {
				let valor
				if(item.iSelect){
					if(fragment){ valor = sap.ui.core.Fragment.byId(fragment, item.id).getSelectedKey();
					}else{ valor = this.getView().byId(item.id).getSelectedKey(); }
					// centrog = sap.ui.core.Fragment.byId(fragment, item.id).getValue(); 
				}else{
					if(fragment){ valor = sap.ui.core.Fragment.byId(fragment, item.id).getValue();
					}else{ valor = this.getView().byId(item.id).getValue(); } 
				}
				// console.log("valor item FILTRO "+item.tabAtr,valor)
				if (valor) {
					// console.log("prime if CON DATO" ,item.id)
					if (item.iFecha) {
						const fechaFormateada = this.cambiarFormatoFecha(valor);
						// console.log("fechaFormateada",fechaFormateada)
						result.push(new sap.ui.model.Filter(item.tabAtr, sap.ui.model.FilterOperator.Contains, fechaFormateada));
					} else {
						result.push(new sap.ui.model.Filter(item.tabAtr, sap.ui.model.FilterOperator.Contains, valor));
					}
				}
			});
			return result; 
		},
		cleanForm: function (arrayClean,fragment=false) {   
			for (const item of arrayClean) { 
				if(fragment){sap.ui.core.Fragment.byId(fragment, item.id).setValue('');}
				else{this.getView().byId(item.id).setValue(''); }
				
			}
		}, 
		cambiarFormatoFecha: function (fecha, newDate=false) {
			let fechaReturn 
			// para saber si el la fecha q se envia es 8/21/23
			if(newDate){
				let date = fecha;
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade ceros a la izquierda si es necesario
				const day = String(date.getDate()).padStart(2, '0'); // Añade ceros a la izquierda si es necesario
				fechaReturn = `${year}-${month}-${day}`;

			}else{
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
			}
			return fechaReturn
		},
		getDateTimeHora: function(dateTime) {
			// const year = dateTime.getFullYear();
			// const month = String(dateTime.getMonth() + 1).padStart(2, '0');
			// const day = String(dateTime.getDate()).padStart(2, '0');
			const hours = String(dateTime.getHours()).padStart(2, '0');
			const minutes = String(dateTime.getMinutes()).padStart(2, '0');
			const seconds = String(dateTime.getSeconds()).padStart(2, '0');
			// return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			return `${hours}:${minutes}:${seconds}`;
		}
    });
});
