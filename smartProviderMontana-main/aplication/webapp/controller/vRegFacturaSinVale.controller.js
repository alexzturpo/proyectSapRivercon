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

    return Controller.extend("spm.aplication.controller.vRegFacturaSinVale", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () { 
        },
        onAfterRendering: function () {
			// this.f_inicializar()
			// let v_rucEmpresa = this.getView().getModel("myParam").getProperty("/model_selectEmpresa")
			// console.log("v_rucEmpresa",v_rucEmpresa) 
        }, 
        onPageBack: function () { 
            this.getRouter().getTargets().display("vMain");
        },
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
            if (!this.dgAsigPosiciones) { this.dgAsigPosiciones = sap.ui.xmlfragment("idDgAsigPosiciones02", "spm.aplication.view.fragments.dgAsigPosiciones", this) };
            e.addDependent(this.dgAsigPosiciones);
            return this.dgAsigPosiciones 
        },
        dgAsigPosicionesOk: function () {  
            this.dgCancelAsigPosiciones() 
        },
        dgCancelAsigPosiciones: function () { this._dgAsigPosiciones().close() },
		dgSearchAsigPosiciones: function () {  
			let idTable = "table_idAsignarPosiciones"
			let idFragment = "idDgAsigPosiciones02"
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
			this.cleanForm(objClean,"idDgAsigPosiciones02");
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

			// this._dgDocumentos().open() 
		},
        _dgDocumentos: function () { 
            var e = this.getView();
            if (!this.dgDocumentos) { this.dgDocumentos = sap.ui.xmlfragment("idDgDocumentos02", "spm.aplication.view.fragments.dgDocumentos", this) };
            e.addDependent(this.dgDocumentos);
            return this.dgDocumentos 
        },
        dgDocumentosOk: function () {this.dgCancelDocumentos()},
        dgCancelDocumentos: function () { this._dgDocumentos().close() },
        btn_AddDocsFacturas: function () { 
			let fragment = "idDgDocumentos02"; 
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
			let fragment = "idDgDocumentos02"; 
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
			let fragment = "idDgDocumentos02"; 
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

        change: function (e) {
			var oModel = this.getView().getModel("myParam");
			// sap.ui.getCore()._file = e.getParameter("files") && e.getParameter("files")[0];
			let v_fileData = e.getParameter("files") && e.getParameter("files")[0];
			oModel.setProperty("/v_fileData",v_fileData);
            console.log("change",v_fileData )
			
		},

		//CARGA XML
        btnAnadirCargarXMLTabla: async function () {
			try {
				let aInputs = [ {id:"idXML", message: "Cargar archivo XML"} ];
                let v_validImputs = this._validacionInputs(aInputs);  
                if(v_validImputs){
					console.log('btnAnadirCargarXMLTabla');
					var oModel = this.getView().getModel("myParam");
					var varNameXML = this.getView().byId("idXML").getValue();
					// console.log(varNameXML,varNameXML.length)
					// debugger
					var listItemDetalleFactura = varNameXML.length;  
					// if (varNameXML) { 
						if (listItemDetalleFactura.length === 0) { 
							this.efectuarCargaFileXML();
						} else {
							let typeMsm = "information",
							titleMsm = "¿Está seguro de cargar el nuevo XML? El detalle de la factura al igual que su cabecera serán reemplazados."
							let ok = await this.MessageBoxPress(typeMsm,titleMsm)
							if(ok){this.efectuarCargaFileXML();} 
						} 
					// } else { MessageToast.show("Se requiere seleccionar alguna Factura."); }
				}

			} catch (err) {
				console.log(err);
			}
		},
        efectuarCargaFileXML: function () {
			debugger
			console.log('efectuarCargaFileXML');
			var oModel = this.getView().getModel("myParam");
			// var v_empresa = oModel.getProperty("/model_selectEmpresa/key");
			// var v_proveedor = oModel.getProperty("/model_selectProveedor/key");
			var usuarioLogin = oModel.getProperty("/model_selectEmpresa/key")
			var usuarioRuc = oModel.getProperty("/model_selectProveedor/key");
			console.log('dddas');
			var file = oModel.getProperty("/v_fileData");
			// var file = sap.ui.getCore()._file;

			console.log('dddas11');
			oModel.setProperty("/listOrdenCompraSelect", []);
			oModel.setProperty("/listTablaDocumentos", []);
			//añadido jcl 20220206--
			oModel.setProperty("/listTablaDocumentosGR", []);
			oModel.setProperty("/listTablaDocumentosOTROS", []);
			oModel.setProperty("/listTablaDocumentosDB", []);
			oModel.setProperty("/fechaDesde", "");
			oModel.setProperty("/fechavenc", "");
			oModel.setProperty("/fechaDesdeV", new Date());
			//----			
			oModel.setProperty("/listItemDetalleFactura", []); //modelo para la tabla
			oModel.setProperty("/listErrores", []);
			oModel.setProperty("/facturaXMLSeleccionados", []);
			//alert('b');
			this.getView().setBusy(true);
			try {
				if (file && window.FileReader) {
					//alert('c1');
					var fechaUsu = new Date();
					var dia = fechaUsu.getDate();
					var mes = fechaUsu.getMonth() + 1;
					var minutos = fechaUsu.getMinutes();
					var segundos = fechaUsu.getSeconds();
					dia = dia.toString();
					mes = mes.toString();
					minutos = minutos.toString();
					segundos = segundos.toString();
					if (dia.length === 1) {
						dia = "0" + dia;
					}
					if (mes.length === 1) {
						mes = "0" + mes;
					}
					if (minutos.length === 1) {
						minutos = "0" + minutos;
					}
					if (segundos.length === 1) {
						segundos = "0" + segundos;
					}
					var dateUsu = fechaUsu.getFullYear() + '/' + mes + '/' + dia;
					var timeUsu = fechaUsu.getHours() + ":" + minutos + ":" + segundos;

					var oFileUploader = this.getView().byId("idXML");

					var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
					this.fileGlobal = file;
					var objeto = {};
					objeto.file = file;
					var calculo = file.size / 1024;
					calculo = calculo.toFixed(2);
					var fecha = file.lastModifiedDate;
					console.log(fecha);
					var diaFile = fecha.getDate();
					var mesFile = fecha.getMonth() + 1;
					var minutosFile = fecha.getMinutes();
					var segundosFile = fecha.getSeconds();
					diaFile = diaFile.toString();
					mesFile = mesFile.toString();
					minutosFile = minutosFile.toString();
					segundosFile = segundosFile.toString();
					if (diaFile.length === 1) {
						diaFile = "0" + diaFile;
					}
					if (mesFile.length === 1) {
						mesFile = "0" + mesFile;
					}
					if (minutosFile.length === 1) {
						minutosFile = "0" + minutosFile;
					}
					if (segundosFile.length === 1) {
						segundosFile = "0" + segundosFile;
					}
					var date = fecha.getFullYear() + '/' + mesFile + '/' + diaFile;
					var time = fecha.getHours() + ":" + minutosFile + ":" + segundosFile;
					//alert('d1');
					objeto.fecha = date;
					objeto.hora = time;
					objeto.fechaUsu = dateUsu;
					objeto.horaUsu = timeUsu;
					objeto.tamano = calculo;
					objeto.nombreUsu = file.name;
					objeto.estado = "Cargado";
					oModel.setProperty("/documentoXML", objeto);
					var reader = new FileReader();
					reader.onload = function (evn) {
						try {
							debugger
							console.log(reader.result);
							var strCSV = evn.target.result; //string in CSV 
							var oModel2 = new sap.ui.model.xml.XMLModel();
							console.log(oModel2);
							oModel2.setXML(strCSV);
							console.log(oModel2);

							///////////////////////////////////// 20200228

							var varOpcion1ParaId = oModel2.getProperty("/cbc:ID");
							var varOpcion2ParaId = oModel2.getProperty("/OriginalMessage/Invoice/cbc:ID");
							var varOpcion3ParaId = oModel2.getProperty("/n2:ID");

							var varComplementoTag = "";
							if (varOpcion1ParaId !== "") {
								varComplementoTag = "";
							} else if (varOpcion2ParaId !== "") {
								varComplementoTag = "/OriginalMessage/Invoice";
							} else if (varOpcion3ParaId !== "") {
								varComplementoTag = "";
							}

							console.log(oModel2.getProperty(varComplementoTag + "/cbc:ID"));
							console.log(oModel2.getProperty("/cbc:ID"));
							/////////////////////////////////////

							var varNumFactura = "";
							var varNumFactura1 = oModel2.getProperty(varComplementoTag + "/cbc:ID");
							var varNumFactura2 = oModel2.getProperty(varComplementoTag + "/n2:ID");
							if (varNumFactura1.toString().trim() !== "") {
								varNumFactura = varNumFactura1;
							} else if (varNumFactura2.toString().trim() !== "") {
								varNumFactura = varNumFactura2;
							}

							console.log(varNumFactura);

							var filters = [];
							var filter;
							filter = new sap.ui.model.Filter("ID_FACTURA", sap.ui.model.FilterOperator.EQ, varNumFactura);
							filters.push(filter);
							filter = new sap.ui.model.Filter("US_RUC", sap.ui.model.FilterOperator.EQ, usuarioLogin);
							filters.push(filter);
							filter = new sap.ui.model.Filter("EM_RUC", sap.ui.model.FilterOperator.EQ, usuarioRuc);
							filters.push(filter);
							var url = "/public/proveedores/tablap.xsodata"; //DUDAS
							var oModelOdata = new sap.ui.model.odata.v2.ODataModel(url, true);
							oModelOdata.read("/T_FAC?$format=json", {
								filters: filters,
								success: function (response) {
									var oModelJSON = new sap.ui.model.json.JSONModel(response.results);
									var lenghtV = oModelJSON.getData().length;
									if (lenghtV === 0) { //20200928
										var sunatUsuario = oModel.getProperty("/sunatUsuario");
										var sunatContrasena = oModel.getProperty("/sunatContrasena");
										oModel.setProperty("/listItemCabeceraFactura", []);
										oModel.setProperty("/listItemDetalleFactura", []);
										var vectorCabeceraFactura = oModel.getProperty("/listItemCabeceraFactura");
										var vectorDetalleFactura = oModel.getProperty("/listItemDetalleFactura");

										// Cabecera de la Factura
										var varVersionUBL = "";
										var varVersionUBL1 = oModel2.getProperty(varComplementoTag + "/cbc:UBLVersionID");
										var varVersionUBL2 = oModel2.getProperty(varComplementoTag + "/ne:UBLVersionID");
										var varVersionUBL3 = oModel2.getProperty(varComplementoTag + "/n2:UBLVersionID");
										if (varVersionUBL1.toString().trim() !== "") {
											varVersionUBL = varVersionUBL1;
										} else if (varVersionUBL2.toString().trim() !== "") {
											varVersionUBL = varVersionUBL2;
										} else if (varVersionUBL3.toString().trim() !== "") {
											varVersionUBL = varVersionUBL3;
										}
										console.log(varVersionUBL);
										if (varVersionUBL === "2.0") {
											console.log(varVersionUBL);
											var varRUCEmisor = oModel2.getProperty(varComplementoTag + "/cac:AccountingSupplierParty/cbc:CustomerAssignedAccountID");

											var varRUCReceptor = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingCustomerParty/cbc:CustomerAssignedAccountID");
											if (oModel2.getProperty(varComplementoTag + "/cac:AccountingCustomerParty/cbc:CustomerAssignedAccountID") === "") {
												varRUCReceptor = oModel2.getProperty(varComplementoTag + "/cac:AccountingCustomerParty/cbc:AdditionalAccountID");
											}

											var varNumFactura = oModel2.getProperty(varComplementoTag + "/cbc:ID");
											var varFecEmision = oModel2.getProperty(varComplementoTag + "/cbc:IssueDate");
											var varEmiRazonSocial = oModel2.getProperty(varComplementoTag +
												"/cac:Signature/cac:SignatoryParty/cac:PartyName/cbc:Name");
											var varNomComercial = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name");

											console.log(varRUCEmisor);
											console.log(usuarioLogin);
											if (varRUCEmisor === usuarioLogin) { //20200214

												var varCodTipoDoc = oModel2.getProperty(varComplementoTag + "/cbc:InvoiceTypeCode");
												if (varRUCReceptor === usuarioRuc) {
													var recRazonSocial1 = oModel2.getProperty(varComplementoTag +
														"/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:RegistrationName");
													var recRazonSocial2 = oModel2.getProperty(varComplementoTag +
														"/cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName");
													var recRazonSocial3 = oModel2.getProperty(varComplementoTag +
														"/ne:AccountingCustomerParty/ne:Party/n1:PartyLegalEntity/ne:RegistrationName");
													var varRecRazonSocial = "";
													if (recRazonSocial1.toString().trim() !== "") {
														varRecRazonSocial = recRazonSocial1;
													} else if (recRazonSocial2.toString().trim() !== "") {
														varRecRazonSocial = recRazonSocial2;
													} else if (recRazonSocial3.toString().trim() !== "") {
														varRecRazonSocial = recRazonSocial3;
													} else {
														varRecRazonSocial = "";
													}

													var varMoneda = oModel2.getProperty(varComplementoTag + "/cbc:DocumentCurrencyCode");
													var varIGV = "0%";

													var llaveCabeceraFacLabel = [];
													llaveCabeceraFacLabel[0] = "Versión del UBL";
													//		llaveCabeceraFacLabel[1] = "Numeración de la Factura";
													llaveCabeceraFacLabel[1] = "Fecha de Emisión";
													llaveCabeceraFacLabel[2] = "Nombres o Denominación o Razón Social";
													llaveCabeceraFacLabel[3] = "Nombre Comercial";
													llaveCabeceraFacLabel[4] = "Número de RUC";
													llaveCabeceraFacLabel[5] = "Tipo de documento";
													llaveCabeceraFacLabel[6] = "Número de RUC del adquirente o usuario";
													llaveCabeceraFacLabel[7] = "Nombres o Denominación o Razón Social del adquirente o usuario";
													llaveCabeceraFacLabel[8] = "Moneda";
													llaveCabeceraFacLabel[9] = "Tasa de IGV";

													var llaveCabeceraFacValue = [];
													llaveCabeceraFacValue[0] = varVersionUBL;
													//		llaveCabeceraFacValue[1] = varNumFactura;
													llaveCabeceraFacValue[1] = varFecEmision;
													llaveCabeceraFacValue[2] = varEmiRazonSocial;
													llaveCabeceraFacValue[3] = varNomComercial;
													llaveCabeceraFacValue[4] = varRUCEmisor;
													llaveCabeceraFacValue[5] = varCodTipoDoc;
													llaveCabeceraFacValue[6] = varRUCReceptor;
													llaveCabeceraFacValue[7] = varRecRazonSocial;
													llaveCabeceraFacValue[8] = varMoneda;
													llaveCabeceraFacValue[9] = varIGV;

													var llaveCabecera = {};
													for (var i = 0; i < llaveCabeceraFacValue.length; i++) {
														llaveCabecera = {};
														llaveCabecera.label = llaveCabeceraFacLabel[i];
														llaveCabecera.value = llaveCabeceraFacValue[i];
														vectorCabeceraFactura.push(llaveCabecera);
													}
													oModel.setProperty("/pages/0/description", varNumFactura);
													oModel.setProperty("/listItemCabeceraFactura", vectorCabeceraFactura);
													//alert('c1');
													// Detalle de la Factura
													var cont = 1;
													var tamDetalleFactura = 0;
													var realizar = true;
													var texto = "";
													var textoVariable = "";
													var InvoiceLine = oModel2.getProperty(varComplementoTag + "/cac:InvoiceLine");
													var CreditNoteLine = oModel2.getProperty(varComplementoTag + "/cac:CreditNoteLine");
													if (InvoiceLine.toString().trim() !== "") {
														texto = varComplementoTag + "/cac:InvoiceLine";
														textoVariable = "/cbc:InvoicedQuantity";
													} else if (CreditNoteLine.toString().trim() !== "") {
														texto = varComplementoTag + "/cac:CreditNoteLine";
														textoVariable = "/cbc:CreditedQuantity";
													} else {
														realizar = false;
													}

													if (realizar) {
														while (cont === 1) {
															try {
																oModel2.getProperty(texto + "/" + tamDetalleFactura + "/cbc:ID");
																tamDetalleFactura = tamDetalleFactura + 1;
															} catch (err) {
																cont = 0;
															}
														}

														var varPosicion = [];
														var varCodigo = [];
														var varDescripcion = [];
														var varUnidMedida = [];
														var varCantidad = [];
														var varAfectacionIGV = [];
														var varPrecioUnitxItem = [];
														var varPrecioVentaxItem = [];
														var varTotalIGVxItem = [];
														var varValorVentaxItem = [];
														var varValortotalNetoXItem = [];

														var llaveDetalle = {};
														var valor1Codigo = "";
														var valor2Codigo = "";
														var descripcionTotal = "";
														var conteoTotalsinIGV = 0;
														for (var j = 0; j < tamDetalleFactura; j++) {
															llaveDetalle = {};

															varPosicion[j] = oModel2.getProperty(texto + "/" + j + "/cbc:ID");

															valor1Codigo = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:SellersItemIdentification/cbc:ID");
															valor2Codigo = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:AdditionalItemProperty/cbc:Value");
															if (valor1Codigo.toString().trim() !== "") {
																varCodigo[j] = valor1Codigo;
															} else if (valor2Codigo.toString().trim() !== "") {
																varCodigo[j] = valor2Codigo;
															} else {
																varCodigo[j] = "";
															}

															varDescripcion[j] = oModel2.getProperty(texto + "/" + j + "/cac:Item/cbc:Description");
															descripcionTotal = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:AdditionalItemProperty/cbc:Name");
															if (descripcionTotal.toString().trim() !== "") {
																varDescripcion[j] = varDescripcion[j] + " - " + descripcionTotal;
															}

															varUnidMedida[j] = oModel2.getProperty(texto + "/" + j + textoVariable + "/@unitCode");
															varCantidad[j] = oModel2.getProperty(texto + "/" + j + textoVariable);
															varAfectacionIGV[j] = oModel2.getProperty(texto + "/" + j +
																"/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme/cbc:Name");
															varPrecioUnitxItem[j] = oModel2.getProperty(texto + "/" + j + "/cac:Price/cbc:PriceAmount");
															varPrecioVentaxItem[j] = oModel2.getProperty(texto + "/" + j +
																"/cac:PricingReference/cac:AlternativeConditionPrice/cbc:PriceAmount");
															varTotalIGVxItem[j] = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cbc:TaxAmount");
															varValorVentaxItem[j] = oModel2.getProperty(texto + "/" + j + "/cbc:LineExtensionAmount");
															var taxsubtotal = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount");
															console.log(taxsubtotal);
															if (parseFloat(varValorVentaxItem[j]) > parseFloat(varPrecioVentaxItem[j])) {
																if (parseFloat(varValorVentaxItem[j]) > parseFloat(taxsubtotal)) {
																	varValorVentaxItem[j] = parseFloat(varValorVentaxItem[j]) - parseFloat(varTotalIGVxItem[j]);
																	varValorVentaxItem[j] = varValorVentaxItem[j].toString();
																}
															} else if (parseFloat(varValorVentaxItem[j]) === 0) {
																var calculo = parseFloat(varTotalIGVxItem[j], 10) * 100 / 18;
																varValorVentaxItem[j] = calculo;
															}
															varValortotalNetoXItem[j] = parseFloat(varTotalIGVxItem[j], 10) + parseFloat(varValorVentaxItem[j], 10);

															llaveDetalle.clistItemDetalleFacturaPosicion = varPosicion[j];
															llaveDetalle.clistItemDetalleFacturaEstado = "Sin Asignar";
															llaveDetalle.clistItemDetalleFacturaCodigo = varCodigo[j];
															llaveDetalle.clistItemDetalleFacturaDescripcion = varDescripcion[j];
															llaveDetalle.clistItemDetalleFacturaUniMedida = varUnidMedida[j];
															llaveDetalle.clistItemDetalleFacturaCantidad = parseFloat(varCantidad[j]).toFixed(2);
															llaveDetalle.clistItemDetalleFacturaAfectacionIGV = varAfectacionIGV[j];
															llaveDetalle.clistItemDetalleFacturaPreUnixItem = varPrecioUnitxItem[j];
															llaveDetalle.clistItemDetalleFacturaPreVenxItem = varPrecioVentaxItem[j];

															llaveDetalle.clistItemDetalleFacturaTotIGVxItem = varTotalIGVxItem[j];
															llaveDetalle.clistItemDetalleFacturaValorVenxItem = parseFloat(varValorVentaxItem[j]).toFixed(2);
															llaveDetalle.clistItemDetalleFacturaTotal = "0";
															conteoTotalsinIGV += parseFloat(varValorVentaxItem[j]);
															llaveDetalle.clistItemDetalleFacturaValortotalNetoXItem = varValortotalNetoXItem[j].toFixed(2);
															llaveDetalle.clistItemsOrdenCompra = [];
															vectorDetalleFactura.push(llaveDetalle);
														}

														oModel.setProperty("/listItemDetalleFactura", vectorDetalleFactura);

														// Resultados del Detalle de la Factura
														var varTotalDescuentos = oModel2.getProperty(varComplementoTag + "/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount");
														var varTotalIGV = oModel2.getProperty(varComplementoTag + "/cac:TaxTotal/cbc:TaxAmount");
														var varImporteTotal = oModel2.getProperty(varComplementoTag + "/cac:LegalMonetaryTotal/cbc:PayableAmount");

														this.getView().byId("idTotalDescuentos").setValue(varTotalDescuentos);
														this.getView().byId("idTotalIGV").setValue(varTotalIGV);
														this.getView().byId("idImporteTotal").setValue(varImporteTotal);
														var conteoTotalsinIGV = parseFloat(varImporteTotal.toString()) - parseFloat(varTotalIGV.toString());
														this.getView().byId("idImporteTotalIGV").setValue(conteoTotalsinIGV.toFixed(2));
														console.log("OBTENER TASA %");
														console.log("Importe total : " + varImporteTotal);
														console.log("Total sin IGV : " + conteoTotalsinIGV);
														var calculoTasaIGV = (parseFloat(varImporteTotal.toString()) - parseFloat(conteoTotalsinIGV.toString())) * 100 /
															parseFloat(conteoTotalsinIGV.toString());
														console.log("TASA % : " + calculoTasaIGV);
														var listItemCabeceraFactura = oModel.getProperty("/listItemCabeceraFactura");
														listItemCabeceraFactura[9].value = calculoTasaIGV.toFixed(0) + "%";
														oModel.setProperty("/listItemCabeceraFactura", listItemCabeceraFactura);
														// Validar la Factura con la Orden de Compra

														sap.m.MessageToast.show("Se realizó la carga XML.");
														this.validarSunat();
														this.verificarAsignaciónPosFactura();
														this.validarDocumentos();
														var archivoValidar = file.name;
														var fileTexto = file.name;
														archivoValidar = archivoValidar.split(".");
														var formatoTexto = "." + archivoValidar[archivoValidar.length - 1];
														fileTexto = fileTexto.substring(0, fileTexto.length - formatoTexto.length);
														var textoUtf8 = this.encode_utf8(fileTexto);
														var url_metodo_descarga =
															"/METODO/downloadfileservlet.svc/DOWNLOAD_FILES?pcod=f_download_file&tipo_descarga=NOMBRE_DOCUMENT_CMIS_DOCUMENT_PORTAL&nombre_document=" +
															file.name;
														//$.ajax('/METODO/metodos/obtener?nombre=' + textoUtf8, {
														$.ajax(url_metodo_descarga, { //GMTV 10/05/2022
															method: 'GET',
															success: function (response) {
																var cont = 0;
																var vectorReg = response.value[0].message.split("|"); //20220620
																var vectorFinal = [];
																var llaveFinal = {};
																for (var i = 0; i < vectorReg.length; i++) {
																	var registro = vectorReg[i].split("/");
																	if (registro.length !== 1) {
																		llaveFinal = {};
																		llaveFinal.objectTypeId = registro[1];
																		llaveFinal.name = registro[2];
																		llaveFinal.createdBy = registro[3];
																		llaveFinal.objectId = registro[4];
																		llaveFinal.contentStreamFileName = registro[5];
																		llaveFinal.contentStreamMimeType = registro[6];
																		llaveFinal.contentStreamLength = registro[7];
																		vectorFinal.push(llaveFinal);
																	}
																}
																for (var i = 0; i < vectorFinal.length; i++) {
																	var nombre = vectorFinal[i].name;
																	if (nombre.includes(fileTexto) && nombre.includes(formatoTexto)) {
																		cont++;
																	}
																}
																var vectorDoc = oModel.getProperty("/listTablaDocumentos");
																var llaveDoc = {};
																if (cont === 0) {
																	llaveDoc.NOMRE_DOC = file.name;
																} else {
																	cont++;
																	var filename = file.name;
																	filename = filename.split(".");
																	var formatoTexto2 = filename[filename.length - 1];
																	var fileTexto2 = file.name;
																	formatoTexto2 = formatoTexto2.length + 1;
																	fileTexto2 = fileTexto2.substring(0, fileTexto2.length - formatoTexto2);
																	llaveDoc.NOMRE_DOC = fileTexto2 + " (" + cont + ")." + filename[filename.length - 1];
																}
																llaveDoc.FECHA = date;
																llaveDoc.HORA = time;
																var file2 = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
																var calculo = file2.size / 1024;
																calculo = calculo.toFixed(2);
																llaveDoc.TAMANO = calculo;
																llaveDoc.FORM = file;
																llaveDoc.TIPO = file.type;
																vectorDoc.push(llaveDoc);
																oModel.setProperty("/listTablaDocumentos", vectorDoc);
																this.getView().setBusy(false);
															}.bind(this),
															error: function (err) {
																console.log("ERROR DOCUMENT ROOT");
																console.log(err);
																this.getView().setBusy(false);
															}.bind(this)
														});
													} else {
														this.getView().setBusy(false);
														sap.m.MessageToast.show("No se pudo realizar la carga de los items del XML.");
													}
												} else {
													this.getView().setBusy(false);
													this.funcionLimpiarVista();
													var dialog = new sap.m.Dialog({
														title: "Error de RUC de la empresa",
														type: "Message",
														state: "Warning",
														content: new sap.m.Text({
															text: "El número de RUC " + varRUCReceptor +
																" de la empresa que indica en la factura no corresponde con su número de RUC " + usuarioRuc + "."
														}),
														beginButton: new sap.m.Button({
															text: "Aceptar",
															type: "Emphasized",
															press: function () {
																dialog.close();
																dialog.destroy();

															}
														}),
														afterClose: function () {
															dialog.destroy();
														}
													});

													dialog.open();
												}
											} else {
												this.getView().setBusy(false);
												this.funcionLimpiarVista();
												var dialog = new sap.m.Dialog({
													title: "Error de RUC del proveedor",
													type: "Message",
													state: "Warning",
													content: new sap.m.Text({
														text: "El número de RUC " + varRUCEmisor +
															" del proveedor que indica en la factura no corresponde con su número de RUC " + usuarioLogin + "."
													}),
													beginButton: new sap.m.Button({
														text: "Aceptar",
														type: "Emphasized",
														press: function () {
															dialog.close();
															dialog.destroy();

														}
													}),
													afterClose: function () {
														dialog.destroy();
													}
												});

												dialog.open();
											}
										} else {
											console.log(varVersionUBL);
											var rucEmisor1 = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/CompanyID");
											var rucEmisor2 = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID");
											var rucEmisor3 = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingSupplierParty/ne:Party/n1:PartyIdentification/ne:ID");
											var rucEmisor4 = oModel2.getProperty(varComplementoTag +
												"/cac:AccountingSupplierParty/n1:Party/n1:PartyIdentification/n2:ID");
											console.log(varComplementoTag);
											console.log(rucEmisor2);
											console.log(oModel2.getProperty("/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID"));

											var varRUCEmisor = "";
											var realizarN01 = false;
											if (rucEmisor1.toString().trim() !== "") {
												varRUCEmisor = rucEmisor1;
											} else if (rucEmisor2.toString().trim() !== "") {
												varRUCEmisor = rucEmisor2;
											} else if (rucEmisor4.toString().trim() !== "") {
												varRUCEmisor = rucEmisor4;
											} else if (rucEmisor3.toString().trim() !== "") {
												varRUCEmisor = rucEmisor3;
												realizarN01 = true;
											} else {
												varRUCEmisor = "";
											}
											console.log(varRUCEmisor);
											console.log(usuarioLogin);
											if (!realizarN01) {

												var varNumFactura = "";
												var varNumFactura1 = oModel2.getProperty(varComplementoTag + "/cbc:ID");
												var varNumFactura2 = oModel2.getProperty(varComplementoTag + "/n2:ID");
												if (varNumFactura1 !== "") {
													varNumFactura = varNumFactura1;
												} else if (varNumFactura2 !== "") {
													varNumFactura = varNumFactura2;
												}

												var varFecEmision = "";
												var varFecEmision1 = oModel2.getProperty(varComplementoTag + "/cbc:IssueDate");
												var varFecEmision2 = oModel2.getProperty(varComplementoTag + "/n2:IssueDate");
												if (varFecEmision1 !== "") {
													varFecEmision = varFecEmision1;
												} else if (varFecEmision2 !== "") {
													varFecEmision = varFecEmision2;
												}

												var varEmiRazonSocial = oModel2.getProperty(varComplementoTag +
													"/cac:Signature/cac:SignatoryParty/cac:PartyName/cbc:Name");

												var varNomComercial = "";
												var varNomComercial1 = oModel2.getProperty(varComplementoTag +
													"/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name");
												var varNomComercial2 = oModel2.getProperty(varComplementoTag +
													"/cac:AccountingSupplierParty/n1:Party/n1:PartyName/n2:Name");
												if (varNomComercial1 !== "") {
													varNomComercial = varNomComercial1;
												} else if (varNomComercial2 !== "") {
													varNomComercial = varNomComercial2;
												}

												var varCodTipoDoc = "";
												var varCodTipoDoc1 = oModel2.getProperty(varComplementoTag + "/cbc:InvoiceTypeCode");
												var varCodTipoDoc2 = oModel2.getProperty(varComplementoTag + "/n2:InvoiceTypeCode");
												if (varCodTipoDoc1 !== "") {
													varCodTipoDoc = varCodTipoDoc1;
												} else if (varCodTipoDoc2 !== "") {
													varCodTipoDoc = varCodTipoDoc2;
												}

											} else {
												var varNumFactura = oModel2.getProperty(varComplementoTag + "/ne:ID");
												var varFecEmision = oModel2.getProperty(varComplementoTag + "/ne:IssueDate");
												var varEmiRazonSocial = oModel2.getProperty(varComplementoTag +
													"/cac:Signature/cac:SignatoryParty/cac:PartyName/cbc:Name");
												var varNomComercial = oModel2.getProperty(varComplementoTag +
													"/cac:AccountingSupplierParty/ne:Party/n1:PartyName/ne:Name");
												var varCodTipoDoc = oModel2.getProperty(varComplementoTag + "/ne:InvoiceTypeCode");
											}
											console.log(varRUCEmisor);
											console.log(usuarioLogin);

											if (varRUCEmisor === usuarioLogin) { //20200214

												var rucReceptor1 = oModel2.getProperty(varComplementoTag +
													"/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/CompanyID");
												var rucReceptor2 = oModel2.getProperty(varComplementoTag +
													"/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID");
												var rucReceptor3 = oModel2.getProperty(varComplementoTag +
													"/ne:AccountingCustomerParty/ne:Party/n1:PartyIdentification/ne:ID");
												var rucReceptor4 = oModel2.getProperty(varComplementoTag +
													"/n1:AccountingCustomerParty/n1:Party/n1:PartyIdentification/n2:ID");
												console.log(rucReceptor4);
												console.log(varComplementoTag + "n1:AccountingCustomerParty/n1:Party/n1:PartyIdentification/n2:ID");
												var varRUCReceptor = "";
												if (rucReceptor1 !== "") {
													varRUCReceptor = rucReceptor1;
												} else if (rucReceptor2 !== "") {
													varRUCReceptor = rucReceptor2;
												} else if (rucReceptor3 !== "") {
													varRUCReceptor = rucReceptor3;
												} else if (rucReceptor4 !== "") {
													varRUCReceptor = rucReceptor4;
												} else {
													varRUCReceptor = "";
												}

												console.log(varRUCReceptor);
												console.log(usuarioRuc);

												if (varRUCReceptor === usuarioRuc) {
													var recRazonSocial1 = oModel2.getProperty(varComplementoTag +
														"/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:RegistrationName");
													var recRazonSocial2 = oModel2.getProperty(varComplementoTag +
														"/cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName");
													var recRazonSocial3 = oModel2.getProperty(varComplementoTag +
														"/ne:AccountingCustomerParty/ne:Party/n1:PartyLegalEntity/ne:RegistrationName");
													var recRazonSocial4 = oModel2.getProperty(varComplementoTag +
														"/n1:AccountingCustomerParty/n1:Party/n1:PartyLegalEntity/n2:RegistrationName");
													var varRecRazonSocial = "";
													if (recRazonSocial1 !== "") {
														varRecRazonSocial = recRazonSocial1;
													} else if (recRazonSocial2 !== "") {
														varRecRazonSocial = recRazonSocial2;
													} else if (recRazonSocial3 !== "") {
														varRecRazonSocial = recRazonSocial3;
													} else if (recRazonSocial4 !== "") {
														varRecRazonSocial = recRazonSocial4;
													} else {
														varRecRazonSocial = "";
													}

													var varMoneda = oModel2.getProperty(varComplementoTag + "/cbc:DocumentCurrencyCode");
													var varMoneda2 = oModel2.getProperty(varComplementoTag + "/ne:DocumentCurrencyCode");
													var varMoneda3 = oModel2.getProperty(varComplementoTag + "/n2:DocumentCurrencyCode");
													if (varMoneda !== "") {
														varMoneda = varMoneda;
													} else if (varMoneda2.toString().trim() !== "") {
														varMoneda = varMoneda2;
													} else if (varMoneda3.toString().trim() !== "") {
														varMoneda = varMoneda3;
													}
													var varIGV = "0%";

													var llaveCabeceraFacLabel = [];
													llaveCabeceraFacLabel[0] = "Versión del UBL";
													//		llaveCabeceraFacLabel[1] = "Numeración de la Factura";
													llaveCabeceraFacLabel[1] = "Fecha de Emisión";
													llaveCabeceraFacLabel[2] = "Nombres o Denominación o Razón Social";
													llaveCabeceraFacLabel[3] = "Nombre Comercial";
													llaveCabeceraFacLabel[4] = "Número de RUC";
													llaveCabeceraFacLabel[5] = "Tipo de documento";
													llaveCabeceraFacLabel[6] = "Número de RUC del adquirente o usuario";
													llaveCabeceraFacLabel[7] = "Nombres o Denominación o Razón Social del adquirente o usuario";
													llaveCabeceraFacLabel[8] = "Moneda";
													llaveCabeceraFacLabel[9] = "Tasa de IGV";

													var llaveCabeceraFacValue = [];
													llaveCabeceraFacValue[0] = varVersionUBL;
													//		llaveCabeceraFacValue[1] = varNumFactura;
													llaveCabeceraFacValue[1] = varFecEmision;
													llaveCabeceraFacValue[2] = varEmiRazonSocial;
													llaveCabeceraFacValue[3] = varNomComercial;
													llaveCabeceraFacValue[4] = varRUCEmisor;
													llaveCabeceraFacValue[5] = varCodTipoDoc;
													llaveCabeceraFacValue[6] = varRUCReceptor;
													llaveCabeceraFacValue[7] = varRecRazonSocial;
													llaveCabeceraFacValue[8] = varMoneda;
													llaveCabeceraFacValue[9] = varIGV;

													var llaveCabecera = {};
													for (var i = 0; i < llaveCabeceraFacValue.length; i++) {
														llaveCabecera = {};
														llaveCabecera.label = llaveCabeceraFacLabel[i];
														llaveCabecera.value = llaveCabeceraFacValue[i];
														vectorCabeceraFactura.push(llaveCabecera);
													}
													oModel.setProperty("/pages/0/description", varNumFactura);
													oModel.setProperty("/listItemCabeceraFactura", vectorCabeceraFactura);

													// Detalle de la Factura
													var cont = 1;
													var tamDetalleFactura = 0;
													var realizar = true;
													var texto = "";
													var textoVariable = "";
													var InvoiceLine = oModel2.getProperty(varComplementoTag + "/cac:InvoiceLine");
													var CreditNoteLine = oModel2.getProperty(varComplementoTag + "/cac:CreditNoteLine");
													var InvoiceLineN2 = oModel2.getProperty(varComplementoTag + "/n2:InvoiceLine");
													var InvoiceLineN3 = oModel2.getProperty(varComplementoTag + "/n1:InvoiceLine");
													var facturaN2 = false;
													if (InvoiceLine.toString().trim() !== "") {
														texto = varComplementoTag + "/cac:InvoiceLine";
														textoVariable = "/cbc:InvoicedQuantity";
													} else if (CreditNoteLine.toString().trim() !== "") {
														texto = varComplementoTag + "/cac:CreditNoteLine";
														textoVariable = "/cbc:CreditedQuantity";
													} else if (InvoiceLineN3.toString().trim() !== "") {
														texto = varComplementoTag + "/n1:InvoiceLine";
														textoVariable = "/n2:InvoicedQuantity";
													} else if (InvoiceLineN2.toString().trim() !== "") {
														texto = varComplementoTag + "/n2:InvoiceLine";
														textoVariable = "/ne:InvoicedQuantity";
														facturaN2 = true;
													} else {
														realizar = false;
													}

													console.log(texto);
													console.log(textoVariable);

													if (realizar) {
														if (!facturaN2) {
															while (cont === 1) {
																try {
																	oModel2.getProperty(texto + "/" + tamDetalleFactura + "/cbc:ID");
																	oModel2.getProperty(texto + "/" + tamDetalleFactura + "/n2:ID");
																	tamDetalleFactura = tamDetalleFactura + 1;
																} catch (err) {
																	cont = 0;
																}
															}

															var varPosicion = [];
															var varCodigo = [];
															var varDescripcion = [];
															var varUnidMedida = [];
															var varCantidad = [];
															var varAfectacionIGV = [];
															var varPrecioUnitxItem = [];
															var varPrecioVentaxItem = [];
															var varTotalIGVxItem = [];
															var varValorVentaxItem = [];
															var varValortotalNetoXItem = [];

															var llaveDetalle = {};
															var valor1Codigo = "";
															var valor2Codigo = "";
															var valor3Codigo = "";
															var descripcionTotal = "";
															var conteoTotalsinIGV = 0;
															for (var j = 0; j < tamDetalleFactura; j++) {
																llaveDetalle = {};

																var varPosicion1 = oModel2.getProperty(texto + "/" + j + "/cbc:ID");
																var varPosicion2 = oModel2.getProperty(texto + "/" + j + "/n2:ID");
																//varPosicion[j] = oModel2.getProperty(texto + "/" + j + "/cbc:ID");
																if (varPosicion1.toString().trim() !== "") {
																	varPosicion[j] = varPosicion1;
																} else if (varPosicion2.toString().trim() !== "") {
																	varPosicion[j] = varPosicion2;
																} else {
																	varPosicion[j] = "";
																}

																valor1Codigo = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:SellersItemIdentification/cbc:ID");
																valor2Codigo = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:AdditionalItemProperty/cbc:Value");
																valor3Codigo = oModel2.getProperty(texto + "/" + j + "/n1:Item/n1:SellersItemIdentification/n2:ID");
																if (valor1Codigo.toString().trim() !== "") {
																	varCodigo[j] = valor1Codigo;
																} else if (valor2Codigo.toString().trim() !== "") {
																	varCodigo[j] = valor2Codigo;
																} else if (valor3Codigo.toString().trim() !== "") {
																	varCodigo[j] = valor3Codigo;
																} else {
																	varCodigo[j] = "";
																}

																//varDescripcion[j] = oModel2.getProperty(texto + "/" + j + "/cac:Item/cbc:Description");
																var varDescripcion1 = oModel2.getProperty(texto + "/" + j + "/cac:Item/cbc:Description");
																var varDescripcion2 = oModel2.getProperty(texto + "/" + j + "/n1:Item/n2:Description");
																if (varDescripcion1.toString().trim() !== "") {
																	varDescripcion[j] = varDescripcion1;
																} else if (varDescripcion2.toString().trim() !== "") {
																	varDescripcion[j] = varDescripcion2;
																} else {
																	varDescripcion[j] = "";
																}
																descripcionTotal = oModel2.getProperty(texto + "/" + j + "/cac:Item/cac:AdditionalItemProperty/cbc:Name");
																if (descripcionTotal.toString().trim() !== "") {
																	varDescripcion[j] = varDescripcion[j] + " - " + descripcionTotal;
																}

																varUnidMedida[j] = oModel2.getProperty(texto + "/" + j + textoVariable + "/@unitCode");
																varCantidad[j] = oModel2.getProperty(texto + "/" + j + textoVariable);
																console.log(texto + "/" + j + textoVariable);
																console.log(oModel2.getProperty(texto + "/" + j + textoVariable));
																console.log(varCantidad[j]);

																//varAfectacionIGV[j] = oModel2.getProperty(texto + "/" + j +
																//	"/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme/cbc:Name");
																var varAfectacionIGV1 = oModel2.getProperty(texto + "/" + j +
																	"/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cac:TaxScheme/cbc:Name");
																var varAfectacionIGV2 = oModel2.getProperty(texto + "/" + j +
																	"/n1:TaxTotal/n1:TaxSubtotal/n1:TaxCategory/n1:TaxScheme/n2:Name");
																if (varAfectacionIGV1.toString().trim() !== "") {
																	varAfectacionIGV[j] = varAfectacionIGV1;
																} else if (varAfectacionIGV2.toString().trim() !== "") {
																	varAfectacionIGV[j] = varAfectacionIGV2;
																} else {
																	varAfectacionIGV[j] = "";
																}

																//varPrecioUnitxItem[j] = oModel2.getProperty(texto + "/" + j + "/cac:Price/cbc:PriceAmount");
																var varPrecioUnitxItem1 = oModel2.getProperty(texto + "/" + j + "/cac:Price/cbc:PriceAmount");
																var varPrecioUnitxItem2 = oModel2.getProperty(texto + "/" + j + "/n1:Price/n2:PriceAmount");
																if (varPrecioUnitxItem1.toString().trim() !== "") {
																	varPrecioUnitxItem[j] = varPrecioUnitxItem1;
																} else if (varPrecioUnitxItem2.toString().trim() !== "") {
																	varPrecioUnitxItem[j] = varPrecioUnitxItem2;
																} else {
																	varPrecioUnitxItem[j] = "";
																}

																//varPrecioVentaxItem[j] = oModel2.getProperty(texto + "/" + j +
																//	"/cac:PricingReference/cac:AlternativeConditionPrice/cbc:PriceAmount");
																var varPrecioVentaxItem1 = oModel2.getProperty(texto + "/" + j +
																	"/cac:PricingReference/cac:AlternativeConditionPrice/cbc:PriceAmount");
																var varPrecioVentaxItem2 = oModel2.getProperty(texto + "/" + j +
																	"/n1:PricingReference/n1:AlternativeConditionPrice/n2:PriceAmount");
																if (varPrecioVentaxItem1.toString().trim() !== "") {
																	varPrecioVentaxItem[j] = varPrecioVentaxItem1;
																} else if (varPrecioVentaxItem2.toString().trim() !== "") {
																	varPrecioVentaxItem[j] = varPrecioVentaxItem2;
																} else {
																	varPrecioVentaxItem[j] = "";
																}

																//varTotalIGVxItem[j] = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cbc:TaxAmount");
																var varTotalIGVxItem1 = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cbc:TaxAmount");
																var varTotalIGVxItem2 = oModel2.getProperty(texto + "/" + j + "/n1:TaxTotal/n2:TaxAmount");
																if (varTotalIGVxItem1.toString().trim() !== "") {
																	varTotalIGVxItem[j] = varTotalIGVxItem1;
																} else if (varTotalIGVxItem2.toString().trim() !== "") {
																	varTotalIGVxItem[j] = varTotalIGVxItem2;
																} else {
																	varTotalIGVxItem[j] = "";
																}

																//varValorVentaxItem[j] = oModel2.getProperty(texto + "/" + j + "/cbc:LineExtensionAmount");
																var varValorVentaxItem1 = oModel2.getProperty(texto + "/" + j + "/cbc:LineExtensionAmount");
																var varValorVentaxItem2 = oModel2.getProperty(texto + "/" + j + "/n2:LineExtensionAmount");
																if (varValorVentaxItem1.toString().trim() !== "") {
																	varValorVentaxItem[j] = varValorVentaxItem1;
																} else if (varValorVentaxItem2.toString().trim() !== "") {
																	varValorVentaxItem[j] = varValorVentaxItem2;
																} else {
																	varValorVentaxItem[j] = "";
																}

																//var taxsubtotal = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount");
																var taxsubtotal1 = oModel2.getProperty(texto + "/" + j + "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount");
																var taxsubtotal2 = oModel2.getProperty(texto + "/" + j + "/n1:TaxTotal/n1:TaxSubtotal/n2:TaxableAmount");
																if (taxsubtotal1.toString().trim() !== "") {
																	taxsubtotal = taxsubtotal1;
																} else if (taxsubtotal2.toString().trim() !== "") {
																	taxsubtotal = taxsubtotal2;
																} else {
																	taxsubtotal = "";
																}

																console.log(taxsubtotal);
																if (parseFloat(varValorVentaxItem[j]) > parseFloat(varPrecioVentaxItem[j])) {
																	if (parseFloat(varValorVentaxItem[j]) > parseFloat(taxsubtotal)) {
																		varValorVentaxItem[j] = parseFloat(varValorVentaxItem[j]) - parseFloat(varTotalIGVxItem[j]);
																		varValorVentaxItem[j] = varValorVentaxItem[j].toString();
																	}
																} else if (parseFloat(varValorVentaxItem[j]) === 0) {
																	var calculo = parseFloat(varTotalIGVxItem[j], 10) * 100 / 18;
																	varValorVentaxItem[j] = calculo;
																}
																varValortotalNetoXItem[j] = parseFloat(varTotalIGVxItem[j], 10) + parseFloat(varValorVentaxItem[j], 10);

																llaveDetalle.clistItemDetalleFacturaPosicion = varPosicion[j];
																llaveDetalle.clistItemDetalleFacturaEstado = "Sin Asignar";
																llaveDetalle.clistItemDetalleFacturaCodigo = varCodigo[j];
																llaveDetalle.clistItemDetalleFacturaDescripcion = varDescripcion[j];
																llaveDetalle.clistItemDetalleFacturaUniMedida = varUnidMedida[j];
																llaveDetalle.clistItemDetalleFacturaCantidad = parseFloat(varCantidad[j]).toFixed(2);
																llaveDetalle.clistItemDetalleFacturaAfectacionIGV = varAfectacionIGV[j];
																llaveDetalle.clistItemDetalleFacturaPreUnixItem = varPrecioUnitxItem[j];
																llaveDetalle.clistItemDetalleFacturaPreVenxItem = varPrecioVentaxItem[j];
																llaveDetalle.clistItemDetalleFacturaTotIGVxItem = varTotalIGVxItem[j];
																llaveDetalle.clistItemDetalleFacturaValorVenxItem = parseFloat(varValorVentaxItem[j]).toFixed(2);
																llaveDetalle.clistItemDetalleFacturaTotal = "0";
																conteoTotalsinIGV += parseFloat(varValorVentaxItem[j]);
																llaveDetalle.clistItemDetalleFacturaValortotalNetoXItem = varValortotalNetoXItem[j].toFixed(2);
																llaveDetalle.clistItemsOrdenCompra = [];
																vectorDetalleFactura.push(llaveDetalle);
															}

															// this.getView().byId("idImporteTotalIGV").setValue(conteoTotalsinIGV.toFixed(2));
															oModel.setProperty("/listItemDetalleFactura", vectorDetalleFactura);

															// Resultados del Detalle de la Factura
															var varTotalDescuentos = oModel2.getProperty(varComplementoTag + "/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount");

															//var varTotalIGV = oModel2.getProperty(varComplementoTag + "/cac:TaxTotal/cbc:TaxAmount");
															var varTotalIGV1 = oModel2.getProperty(varComplementoTag + "/cac:TaxTotal/cbc:TaxAmount");
															var varTotalIGV2 = oModel2.getProperty(varComplementoTag + "/n1:TaxTotal/n2:TaxAmount");
															var varTotalIGV3 = oModel2.getProperty(varComplementoTag + "/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount");
															console.log(varTotalIGV1);
															console.log(varTotalIGV1.toString().trim());
															console.log(varTotalIGV2);
															console.log(varTotalIGV3);
															if (varTotalIGV1.toString().trim() !== "" && varTotalIGV1.toString().trim() !== "0.00") {
																varTotalIGV = varTotalIGV1;
															} else if (varTotalIGV2.toString().trim() !== "") {
																varTotalIGV = varTotalIGV2;
															} else if (varTotalIGV3.toString().trim() !== "") {
																varTotalIGV = varTotalIGV3;
															} else {
																varTotalIGV = "";
															}
															console.log(varTotalIGV);

															//var varImporteTotal = oModel2.getProperty(varComplementoTag + "/cac:LegalMonetaryTotal/cbc:PayableAmount");
															var varImporteTotal1 = oModel2.getProperty(varComplementoTag + "/cac:LegalMonetaryTotal/cbc:PayableAmount");
															var varImporteTotal2 = oModel2.getProperty(varComplementoTag + "/n1:LegalMonetaryTotal/n2:PayableAmount");
															if (varImporteTotal1.toString().trim() !== "") {
																varImporteTotal = varImporteTotal1;
															} else if (varImporteTotal2.toString().trim() !== "") {
																varImporteTotal = varImporteTotal2;
															} else {
																varImporteTotal = "";
															}

															this.getView().byId("idTotalDescuentos").setValue(varTotalDescuentos);
															this.getView().byId("idTotalIGV").setValue(varTotalIGV);
															this.getView().byId("idImporteTotal").setValue(varImporteTotal);
															var conteoTotalsinIGV = parseFloat(varImporteTotal.toString()) - parseFloat(varTotalIGV.toString());
															this.getView().byId("idImporteTotalIGV").setValue(conteoTotalsinIGV.toFixed(2));
															console.log("OBTENER TASA %");
															console.log("Importe total : " + varImporteTotal);
															console.log("Total sin IGV : " + conteoTotalsinIGV);
															var calculoTasaIGV = (parseFloat(varImporteTotal.toString()) - parseFloat(conteoTotalsinIGV.toString())) * 100 /
																parseFloat(conteoTotalsinIGV.toString());
															console.log("TASA % : " + calculoTasaIGV);
															var listItemCabeceraFactura = oModel.getProperty("/listItemCabeceraFactura");
															listItemCabeceraFactura[9].value = calculoTasaIGV.toFixed(0) + "%";
															oModel.setProperty("/listItemCabeceraFactura", listItemCabeceraFactura);
															// Validar la Factura con la Orden de Compra

															sap.m.MessageToast.show("Se realizó la carga XML.");
															this.validarSunat();
															this.verificarAsignaciónPosFactura();
															this.validarDocumentos();
															var archivoValidar = file.name;
															var fileTexto = file.name;
															archivoValidar = archivoValidar.split(".");
															var formatoTexto = "." + archivoValidar[archivoValidar.length - 1];
															fileTexto = fileTexto.substring(0, fileTexto.length - formatoTexto.length);
															var textoUtf8 = this.encode_utf8(fileTexto);
															console.log(textoUtf8);
															var url_metodo_descarga =
																"/METODO/downloadfileservlet.svc/DOWNLOAD_FILES?pcod=f_download_file&tipo_descarga=NOMBRE_DOCUMENT_CMIS_DOCUMENT_PORTAL&nombre_document=" +
																file.name;
															//$.ajax('/METODO/metodos/obtener?nombre=' + textoUtf8, {
															$.ajax(url_metodo_descarga, { //GMTV 10/05/2022
																method: 'GET',
																success: function (response) {
																	var cont = 0;
																	console.log(response);
																	var vectorReg = response.value[0].message.split("|"); //20220620
																	var vectorFinal = [];
																	var llaveFinal = {};
																	for (var i = 0; i < vectorReg.length; i++) {
																		var registro = vectorReg[i].split("/");
																		if (registro.length !== 1) {
																			llaveFinal = {};
																			llaveFinal.objectTypeId = registro[1];
																			llaveFinal.name = registro[2];
																			llaveFinal.createdBy = registro[3];
																			llaveFinal.objectId = registro[4];
																			llaveFinal.contentStreamFileName = registro[5];
																			llaveFinal.contentStreamMimeType = registro[6];
																			llaveFinal.contentStreamLength = registro[7];
																			vectorFinal.push(llaveFinal);

																		}
																	}
																	console.log(vectorFinal);
																	console.log(fileTexto);
																	console.log(formatoTexto);
																	for (var i = 0; i < vectorFinal.length; i++) {
																		var nombre = vectorFinal[i].name;
																		console.log(nombre);
																		if (nombre.includes(fileTexto) && nombre.includes(formatoTexto)) {
																			cont++;
																		}
																	}
																	var vectorDoc = oModel.getProperty("/listTablaDocumentos");
																	var llaveDoc = {};
																	if (cont === 0) {
																		llaveDoc.NOMRE_DOC = file.name;
																	} else {
																		cont++;
																		var filename = file.name;
																		filename = filename.split(".");
																		var formatoTexto2 = filename[filename.length - 1];
																		var fileTexto2 = file.name;
																		formatoTexto2 = formatoTexto2.length + 1;
																		fileTexto2 = fileTexto2.substring(0, fileTexto2.length - formatoTexto2);
																		llaveDoc.NOMRE_DOC = fileTexto2 + " (" + cont + ")." + filename[filename.length - 1];
																	}
																	llaveDoc.FECHA = date;
																	llaveDoc.HORA = time;
																	var file2 = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
																	var calculo = file2.size / 1024;
																	calculo = calculo.toFixed(2);
																	llaveDoc.TAMANO = calculo;
																	llaveDoc.FORM = file;
																	llaveDoc.TIPO = file.type;
																	vectorDoc.push(llaveDoc);
																	oModel.setProperty("/listTablaDocumentos", vectorDoc);
																	this.getView().setBusy(false);
																}.bind(this),
																error: function (err) {
																	console.log("ERROR DOCUMENT ROOT");
																	console.log(err);
																	this.getView().setBusy(false);
																}.bind(this)
															});
														} else {
															while (cont === 1) {
																try {
																	oModel2.getProperty(texto + "/" + tamDetalleFactura + "/ne:ID");
																	tamDetalleFactura = tamDetalleFactura + 1;
																} catch (err) {
																	cont = 0;
																}
															}

															var varPosicion = [];
															var varCodigo = [];
															var varDescripcion = [];
															var varUnidMedida = [];
															var varCantidad = [];
															var varAfectacionIGV = [];
															var varPrecioUnitxItem = [];
															var varPrecioVentaxItem = [];
															var varTotalIGVxItem = [];
															var varValorVentaxItem = [];
															var varValortotalNetoXItem = [];

															var llaveDetalle = {};
															var valor1Codigo = "";
															var valor2Codigo = "";
															var descripcionTotal = "";
															var conteoTotalsinIGV = 0;
															for (var j = 0; j < tamDetalleFactura; j++) {
																llaveDetalle = {};

																varPosicion[j] = oModel2.getProperty(texto + "/" + j + "/ne:ID");

																valor1Codigo = oModel2.getProperty(texto + "/" + j + "/ne:Item/ne:SellersItemIdentification/ne:ID");
																valor2Codigo = oModel2.getProperty(texto + "/" + j + "/ne:Item/ne:AdditionalItemProperty/ne:Value");
																if (valor1Codigo.toString().trim() !== "") {
																	varCodigo[j] = valor1Codigo;
																} else if (valor2Codigo.toString().trim() !== "") {
																	varCodigo[j] = valor2Codigo;
																} else {
																	varCodigo[j] = "";
																}

																varDescripcion[j] = oModel2.getProperty(texto + "/" + j + "/ne:Item/n0:Description");
																descripcionTotal = oModel2.getProperty(texto + "/" + j + "/ne:Item/ne:AdditionalItemProperty/ne:Name");
																if (descripcionTotal.toString().trim() !== "") {
																	varDescripcion[j] = varDescripcion[j] + " - " + descripcionTotal;
																}

																varUnidMedida[j] = oModel2.getProperty(texto + "/" + j + textoVariable + "/@unitCode");
																varCantidad[j] = oModel2.getProperty(texto + "/" + j + textoVariable);
																varAfectacionIGV[j] = oModel2.getProperty(texto + "/" + j +
																	"/n1:TaxTotal/n1:TaxSubtotal/ne:TaxCategory/ne:TaxScheme/ne:Name");
																varPrecioUnitxItem[j] = oModel2.getProperty(texto + "/" + j + "/ne:Price/ne:PriceAmount");
																varPrecioVentaxItem[j] = oModel2.getProperty(texto + "/" + j +
																	"/ne:PricingReference/n0:AlternativeConditionPrice/ne:PriceAmount");
																varTotalIGVxItem[j] = oModel2.getProperty(texto + "/" + j + "/n1:TaxTotal/ne:TaxAmount");
																varValorVentaxItem[j] = oModel2.getProperty(texto + "/" + j + "/ne:LineExtensionAmount");
																var taxsubtotal = oModel2.getProperty(texto + "/" + j + "/n1:TaxTotal/n1:TaxSubtotal/ne:TaxableAmount");
																console.log(taxsubtotal);
																if (parseFloat(varValorVentaxItem[j]) > parseFloat(varPrecioVentaxItem[j])) {
																	if (parseFloat(varValorVentaxItem[j]) > parseFloat(taxsubtotal)) {
																		varValorVentaxItem[j] = parseFloat(varValorVentaxItem[j]) - parseFloat(varTotalIGVxItem[j]);
																		varValorVentaxItem[j] = varValorVentaxItem[j].toString();
																	}
																} else if (parseFloat(varValorVentaxItem[j]) === 0) {
																	var calculo = parseFloat(varTotalIGVxItem[j], 10) * 100 / 18;
																	varValorVentaxItem[j] = calculo;
																}
																varValortotalNetoXItem[j] = parseFloat(varTotalIGVxItem[j], 10) + parseFloat(varValorVentaxItem[j], 10);

																llaveDetalle.clistItemDetalleFacturaPosicion = varPosicion[j];
																llaveDetalle.clistItemDetalleFacturaEstado = "Sin Asignar";
																llaveDetalle.clistItemDetalleFacturaCodigo = varCodigo[j];
																llaveDetalle.clistItemDetalleFacturaDescripcion = varDescripcion[j];
																llaveDetalle.clistItemDetalleFacturaUniMedida = varUnidMedida[j];
																llaveDetalle.clistItemDetalleFacturaCantidad = parseFloat(varCantidad[j]).toFixed(2);
																llaveDetalle.clistItemDetalleFacturaAfectacionIGV = varAfectacionIGV[j];
																llaveDetalle.clistItemDetalleFacturaPreUnixItem = varPrecioUnitxItem[j];
																llaveDetalle.clistItemDetalleFacturaPreVenxItem = varPrecioVentaxItem[j];
																llaveDetalle.clistItemDetalleFacturaTotIGVxItem = varTotalIGVxItem[j];
																llaveDetalle.clistItemDetalleFacturaValorVenxItem = parseFloat(varValorVentaxItem[j]).toFixed(2);
																llaveDetalle.clistItemDetalleFacturaTotal = "0";
																conteoTotalsinIGV += parseFloat(varValorVentaxItem[j]);
																llaveDetalle.clistItemDetalleFacturaValortotalNetoXItem = varValortotalNetoXItem[j].toFixed(2);
																llaveDetalle.clistItemsOrdenCompra = [];
																vectorDetalleFactura.push(llaveDetalle);
															}

															// this.getView().byId("idImporteTotalIGV").setValue(conteoTotalsinIGV.toFixed(2));
															oModel.setProperty("/listItemDetalleFactura", vectorDetalleFactura);

															// Resultados del Detalle de la Factura
															//var varTotalDescuentos = oModel2.getProperty("/ne:LegalMonetaryTotal/cbc:AllowanceTotalAmount");
															var varTotalDescuentos = "0";
															var varTotalIGV = oModel2.getProperty(varComplementoTag + "/n2:TaxTotal/ne:TaxAmount");
															var varImporteTotal = oModel2.getProperty(varComplementoTag + "/ne:LegalMonetaryTotal/ne:PayableAmount");

															this.getView().byId("idTotalDescuentos").setValue(varTotalDescuentos);
															this.getView().byId("idTotalIGV").setValue(varTotalIGV);
															this.getView().byId("idImporteTotal").setValue(varImporteTotal);
															var conteoTotalsinIGV = parseFloat(varImporteTotal.toString()) - parseFloat(varTotalIGV.toString());
															this.getView().byId("idImporteTotalIGV").setValue(conteoTotalsinIGV.toFixed(2));
															console.log("OBTENER TASA %");
															console.log("Importe total : " + varImporteTotal);
															console.log("Total sin IGV : " + conteoTotalsinIGV);
															var calculoTasaIGV = (parseFloat(varImporteTotal.toString()) - parseFloat(conteoTotalsinIGV.toString())) * 100 /
																parseFloat(conteoTotalsinIGV.toString());
															console.log("TASA % : " + calculoTasaIGV);
															var listItemCabeceraFactura = oModel.getProperty("/listItemCabeceraFactura");
															listItemCabeceraFactura[9].value = calculoTasaIGV.toFixed(0) + "%";
															oModel.setProperty("/listItemCabeceraFactura", listItemCabeceraFactura);
															// Validar la Factura con la Orden de Compra

															sap.m.MessageToast.show("Se realizó la carga XML.");
															this.validarSunat();
															this.verificarAsignaciónPosFactura();
															this.validarDocumentos();
															var archivoValidar = file.name;
															var fileTexto = file.name;
															archivoValidar = archivoValidar.split(".");
															var formatoTexto = "." + archivoValidar[archivoValidar.length - 1];
															fileTexto = fileTexto.substring(0, fileTexto.length - formatoTexto.length);
															var textoUtf8 = this.encode_utf8(fileTexto);
															var url_metodo_descarga =
																"/METODO/downloadfileservlet.svc/DOWNLOAD_FILES?pcod=f_download_file&tipo_descarga=NOMBRE_DOCUMENT_CMIS_DOCUMENT_PORTAL&nombre_document=" +
																file.name;
															//$.ajax('/METODO/metodos/obtener?nombre=' + textoUtf8, {
															$.ajax(url_metodo_descarga, { //GMTV 10/05/2022
																method: 'GET',
																success: function (response) {
																	var cont = 0;
																	var vectorReg = response.value[0].message.split("|"); //20220620
																	var vectorFinal = [];
																	var llaveFinal = {};
																	for (var i = 0; i < vectorReg.length; i++) {
																		var registro = vectorReg[i].split("/");
																		if (registro.length !== 1) {
																			llaveFinal = {};
																			llaveFinal.objectTypeId = registro[1];
																			llaveFinal.name = registro[2];
																			llaveFinal.createdBy = registro[3];
																			llaveFinal.objectId = registro[4];
																			llaveFinal.contentStreamFileName = registro[5];
																			llaveFinal.contentStreamMimeType = registro[6];
																			llaveFinal.contentStreamLength = registro[7];
																			vectorFinal.push(llaveFinal);
																		}
																	}
																	for (var i = 0; i < vectorFinal.length; i++) {
																		var nombre = vectorFinal[i].name;
																		if (nombre.includes(fileTexto) && nombre.includes(formatoTexto)) {
																			cont++;
																		}
																	}
																	var vectorDoc = oModel.getProperty("/listTablaDocumentos");
																	var llaveDoc = {};
																	if (cont === 0) {
																		llaveDoc.NOMRE_DOC = file.name;
																	} else {
																		cont++;
																		var filename = file.name;
																		filename = filename.split(".");
																		var formatoTexto2 = filename[filename.length - 1];
																		var fileTexto2 = file.name;
																		formatoTexto2 = formatoTexto2.length + 1;
																		fileTexto2 = fileTexto2.substring(0, fileTexto2.length - formatoTexto2);
																		llaveDoc.NOMRE_DOC = fileTexto2 + " (" + cont + ")." + filename[filename.length - 1];
																	}
																	llaveDoc.FECHA = date;
																	llaveDoc.HORA = time;
																	var file2 = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
																	var calculo = file2.size / 1024;
																	calculo = calculo.toFixed(2);
																	llaveDoc.TAMANO = calculo;
																	llaveDoc.FORM = file;
																	llaveDoc.TIPO = file.type;
																	vectorDoc.push(llaveDoc);
																	oModel.setProperty("/listTablaDocumentos", vectorDoc);
																	this.getView().setBusy(false);
																}.bind(this),
																error: function (err) {
																	console.log("ERROR DOCUMENT ROOT");
																	console.log(err);
																	this.getView().setBusy(false);
																}.bind(this)
															});
														}
													} else {
														this.getView().setBusy(false);
														sap.m.MessageToast.show("No se pudo realizar la carga de los items del XML.");
													}
												} else {
													this.getView().setBusy(false);
													this.funcionLimpiarVista();
													var dialog = new sap.m.Dialog({
														title: "Error de RUC de la empresa",
														type: "Message",
														state: "Warning",
														content: new sap.m.Text({
															text: "El número de RUC " + varRUCReceptor +
																" de la empresa que indica en la factura no corresponde con su número de RUC " + usuarioRuc + "."
														}),
														beginButton: new sap.m.Button({
															text: "Aceptar",
															type: "Emphasized",
															press: function () {
																dialog.close();
																dialog.destroy();

															}
														}),
														afterClose: function () {
															dialog.destroy();
														}
													});

													dialog.open();
												}
											} else {
												this.getView().setBusy(false);
												this.funcionLimpiarVista();
												var dialog = new sap.m.Dialog({
													title: "Error de RUC del proveedor",
													type: "Message",
													state: "Warning",
													content: new sap.m.Text({
														text: "El número de RUC " + varRUCEmisor +
															" del proveedor que indica en la factura no corresponde con su número de RUC " + usuarioLogin + "."
													}),
													beginButton: new sap.m.Button({
														text: "Aceptar",
														type: "Emphasized",
														press: function () {
															dialog.close();
															dialog.destroy();

														}
													}),
													afterClose: function () {
														dialog.destroy();
													}
												});

												dialog.open();
											}
										}
									} else {
										this.getView().setBusy(false);
										varNumFactura = oModel2.getProperty(varComplementoTag + "/cbc:ID");
										var dialog = new sap.m.Dialog({
											title: "Error factura",
											type: "Message",
											state: "Error",
											icon: "sap-icon://error",
											content: new sap.m.Text({
												text: "La factura " + varNumFactura + " ya ha sido registrada."
											}),
											beginButton: new sap.m.Button({
												text: "Aceptar",
												press: function () {
													dialog.close();
													dialog.destroy();
												}
											}),
											afterClose: function () {
												dialog.destroy();
											}
										});
										dialog.open();
									}
								}.bind(this),
								error: function (oError) {
									this.getView().setBusy(false);
									var dialog = new sap.m.Dialog({
										title: "Error",
										type: "Message",
										state: "Error",
										icon: "sap-icon://error",
										content: new sap.m.Text({
											text: "Se ha presentado un error a la hora la validación de la factura " + varNumFactura + "."
										}),
										beginButton: new sap.m.Button({
											text: "Aceptar",
											press: function () {
												dialog.close();
												dialog.destroy();
											}
										}),
										afterClose: function () {
											dialog.destroy();
										}
									});
									dialog.open();
								}.bind(this)
							});

						} catch (err) {
							console.log(err);
							oModel.setProperty("/listItemDetalleFactura", []);
							this.verificarAsignaciónPosFactura();
							this.getView().setBusy(false);
						}
					}.bind(this);
					reader.readAsText(file);

				} else {
					console.log('e31');
					this.getView().setBusy(false);
				}
			} catch (err) {
				console.log(err);
				this.getView().setBusy(false);
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
