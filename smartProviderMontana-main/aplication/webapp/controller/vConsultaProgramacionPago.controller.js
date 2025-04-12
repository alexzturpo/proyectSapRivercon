sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    var usuario = "CONSULT_MM";
    var password = "Laredo2023**";
    var url_ini = "";
    return Controller.extend("spm.aplication.controller.vConsultaProgramacionPago", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        onPageBack: function () { 
            this.getRouter().getTargets().display("vMain");
        },
        searchFilter: function () {  
			let idTable = "listResFacReg"
			// let idFragment = "idDgAsigPosiciones01"
			let objBusqueda = [ 
				{id:"select_tipoCarga",tabAtr:"TIPO_CARGA",iSelect:true},
				{id:"txt_numFActura",tabAtr:"REFERENCIA",},
				{id:"txt_fechaEmision",tabAtr:"FC_FEC_EMISION",iFecha:true},
				{id:"txt_fechaPago",tabAtr:"FEC_JOB",iFecha:true},
			] 
			let oTable = this.getView().byId(idTable);
			let comFil = this.comFilBusqueda(objBusqueda)  
			let oFilter = new sap.ui.model.Filter({ filters: comFil, and: true }); 
			 oTable.getBinding("items").filter(oFilter, sap.ui.model.FilterType.Application); 
		},
        cleanSearchFilter: function () {  
			// Limpiar imput de archivos
            let objClean = [ 
                {id:"select_tipoCarga"},
                {id:"txt_numFActura"},
                {id:"txt_fechaEmision"},
                {id:"txt_fechaPago"},
            ]; 
            this.cleanForm(objClean);
            this.searchFilter();
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
