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
    return Controller.extend("spm.aplication.controller.vConsultaAnulacionPR", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        onPageBack: function () { 
            let oModel = this.getView().getModel("myParam");  
            oModel.setProperty("/listConsultaResumenFactura",{}); 
            oModel.setProperty("/listFactura",[]);
            this.getRouter().getTargets().display("vMain");
        },
        formatTipoCarga: function (value) { 
            return value
        },
        formatEstadoFactura: function (value) { 
            return value
        },
        documentoAsignado: function (value) { 
            return value
        },
        documentoFormato: function (value) { 
            return value
        },
        documentoValor: function (value) { 
            return value
        },
        fechaValor: function (value) { 
            return value
        },
        horaValor: function (value) { 
            return value
        },
        documentoDJ: function (value) { 
            return value
        },
        documentoVENC: function (value) { 
            return value
        },
        formatEstadoFactura2: function (value) { 
            return value
        },
        clicItemFacturaVal: function (oEvent) {
            let oModel = this.getView().getModel("myParam");  
            let v_Select = oEvent.getSource().getAggregation("attributes")[0].getBindingContext().getProperty(); 
            // console.log(v_Select,"v_Select");  
            oModel.setProperty("/listConsultaResumenFactura", v_Select);
			MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
		},
        onSearchFac: function (oEvent) {   
            let sQuery = oEvent.getSource().getValue(); 
            let objBusqueda = [
                {tabAtr:"ID_FACTURA"},
                {tabAtr:"NOM_DEM_RAZ_ADQ"},
                {tabAtr:"NOM_DEM_RAZ_COMERCIAL"},
                {tabAtr:"TOTAL_IMP"},
                {tabAtr:"MONEDA"},
                {tabAtr:"FC_FEC_REGISTRO"},
                {tabAtr:"FC_HORA_REGISTRO"},
                {tabAtr:"EM_RUC"},
                {tabAtr:"US_RUC"}
            ] 
            let aFilters = this.onSearchList(sQuery, objBusqueda);
            let oList = this.getView().byId("idListFacturas");
            oList.getBinding("items").filter(new sap.ui.model.Filter({ filters: aFilters, and: false })); 
		}, 
		//FRAGMENT Posiciones
        fragmentPosiciones: function () {
            let oModel = this.getView().getModel("myParam");
			let objeto = oModel.getProperty("/listConsultaResumenFactura");  //datos de objeto seleccionado de la lista
			// let visibleColumn01 = true;
			// let visibleColumn02 = true;
			// if (objeto.TIPO_CARGA === "D") {
			// 	visibleColumn01 = true;
			// 	visibleColumn02 = false;
			// } else {
			// 	visibleColumn01 = false;
			// 	visibleColumn02 = true;
			// }

			let vector = oModel.getProperty("/listItemFacturaPosicion"); 
			let subtotal = 0;
			for (let r = 0; r < vector.length; r++) {
				subtotal += parseFloat(vector[r].PRECIO_ING.toString());
			}  
			// console.log("subtotal",subtotal)
			// var subTotal = [];
			// let llaveSub = {total:subtotal.toFixed(2) };
			// llaveSub.total = subtotal.toFixed(2);
			// subTotal.push(llaveSub);
			oModel.setProperty("/subTotal", subtotal.toFixed(2));
			// oTableSubTotal.setModel(oModel);
			this._dgPosiciones().open();
        },
        _dgPosiciones: function () { 
            var e = this.getView();
            if (!this.dgPosiciones) { this.dgPosiciones = sap.ui.xmlfragment("idDgPosiciones", "spm.aplication.view.fragments.dgPosiciones", this) };
            e.addDependent(this.dgPosiciones);
            return this.dgPosiciones 
        }, 
        dgCancelPosiciones: function () { this._dgPosiciones().close() },
		btnBuscarItem2: function () {
			// var objeto = this.getView().byId("ohFac").getBindingContext("myParam").getObject();
			// console.log("objeto",objeto)
			var oModel = this.getView().getModel("myParam");
			var visibleColumn01 = true;
			var visibleColumn02 = true;
			// if (objeto.TIPO_CARGA === "D") {
			// 	visibleColumn01 = true;
			// 	visibleColumn02 = false;
			// } else {
			// 	visibleColumn01 = false;
			// 	visibleColumn02 = true;
			// }
			var oTableItem = new sap.ui.table.Table({
				visibleRowCount: 7,
				alternateRowColors: true,
				selectionMode: "None",
				width: "66.1rem",
				rows: "{/listItemFacturaPosicion}",
				noData: [
					new sap.m.Text({
						text: "Sin vales de ingreso encontrados."
					})
				]
			});
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "5rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Pos."
				}),
				template: new sap.m.Text({
					text: "{POSICION}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "6rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Fecha Ingreso"
				}),
				template: new sap.m.ObjectNumber({
					number: "{PRECIO_ING}",
					unit: "{UND_MED}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "6rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Cantidad"
				}),
				template: new sap.m.ObjectNumber({
					number: "{CANTIDAD}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Vale"
				}),
				template: new sap.m.Text({
					text: "{VALE}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Fecha"
				}),
				template: new sap.m.Text({
					text: "{FEC_VALE}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				visible: visibleColumn02,
				label: new sap.m.Text({
					text: "Hoja Entrada"
				}),
				template: new sap.m.Text({
					text: "{DE_HOJA_ENTRADA}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				visible: visibleColumn01,
				label: new sap.m.Text({
					text: "Doc. Material"
				}),
				template: new sap.m.Text({
					text: "{DE_DOC_MATERIAL}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "20rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Descripción"
				}),
				template: new sap.m.Text({
					text: "{DESCRIPCION}"
				})
			}));
			oTableItem.addColumn(new sap.ui.table.Column({
				width: "8rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: "Guía de remisión"
				}),
				template: new sap.m.Text({
					text: "{GUIA_REMISION}"
				})
			}));
			oTableItem.setModel(oModel);

			var oTableSubTotal = new sap.ui.table.Table({
				id: "idTableTotal",
				visibleRowCount: 1,
				alternateRowColors: true,
				selectionMode: "None",
				columnHeaderVisible: false,
				width: "66.1rem",
				rows: "{/subTotal}"
			});
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "5rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "6rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.ObjectStatus({
					text: "{total}",
					state: "Information"

				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "6rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				visible: visibleColumn02,
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "7rem",
				hAlign: "Center",
				visible: visibleColumn01,
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));
			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "20rem",
				hAlign: "Center",
				label: new sap.m.Text({
					text: ""
				}),
				template: new sap.m.Text({
					text: ""
				})
			}));

			oTableSubTotal.addColumn(new sap.ui.table.Column({
				width: "8rem",
				hAlign: "Center",
				template: new sap.m.Text({
					text: ""
				})
			}));
			var vector = oModel.getProperty("/listItemFacturaPosicion");
			console.log(vector);
			var subtotal = 0;
			for (var r = 0; r < vector.length; r++) {
				subtotal += parseFloat(vector[r].PRECIO_ING.toString());
			}
			console.log(subtotal);

			var subTotal = [];
			var llaveSub = {};
			llaveSub.total = subtotal.toFixed(2);
			subTotal.push(llaveSub);
			oModel.setProperty("/subTotal", subTotal);
			oTableSubTotal.setModel(oModel);

			var oDialogSelectItems = new sap.m.Dialog("idDialogSelectItems", {
				title: "Detalle de las posiciones",
				icon: "sap-icon://activity-2",
				contentWidth: "auto",
				resizable: true,
				draggable: true,
				type: "Message",
				content: [
					new sap.m.Toolbar({
						width: "100%",
						height: "auto",
						content: [
							new sap.ui.core.Icon({
								src: "sap-icon://activity-items",
								alt: "Cart",
								size: "1.25rem"
							}),
							new sap.m.Title({
								text: "Tabla del detalle de las posiciones",
								titleStyle: "H3"
							}),

							new sap.m.ToolbarSpacer({}),
							new sap.m.Title({
								text: "N° de registros (" + vector.length + ")",
								titleStyle: "H3"
							})
						]
					}),

					oTableItem,
					oTableSubTotal
				],
				endButton: new sap.m.Button({
					icon: "sap-icon://cancel",
					text: "Cerrar",
					press: function () {
						oDialogSelectItems.close();
					}.bind(this)
				}),
				afterClose: function () {
					oDialogSelectItems.destroy();
				}.bind(this),
				afterOpen: function () {}.bind(this)
			});
			oDialogSelectItems.addStyleClass("sapUiSizeCompact");
			oDialogSelectItems.open();
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
        onSearchList: function (sQuery,miArray) { 
            let aFilters = []; 
            miArray.forEach(item => {
                aFilters.push(new sap.ui.model.Filter(item.tabAtr, sap.ui.model.FilterOperator.Contains, sQuery));
            });
            return aFilters; 
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
