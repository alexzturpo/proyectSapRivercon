sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("salescloud.controller.Home", {
			onInit: function () {
                var fechaayer = new Date();
                fechaayer.setDate(fechaayer.getDate() - 1);

                this.byId("date1").setDateValue(new Date());
                this.byId("date1reporte").setDateValue(new Date());
                this.byId("date2reporte").setDateValue(new Date());
                this.byId("date1Estadistica").setDateValue(fechaayer);
                this.byId("date2Estadistica").setDateValue(new Date());
                this.byId("date1Visualizacion").setDateValue(new Date("2021-01-01"));
                this.byId("date2Visualizacion").setDateValue(new Date("2021-08-08"));
            
            },
            //  saltos de paneles 
                //navegador de clientes
            tohome: function(){
                this.getSplitContObj().to(this.createId("HomeDetail"));
            },
            tocuentas: function(){
                this.getSplitContObj().to(this.createId("CuentasDetail"));
            },
                tocuentasdata: function(){
                    this.getSplitContObj().to(this.createId("DataCuentasDetail"));
                },
            tocontactos: function(){
                this.getSplitContObj().to(this.createId("ContactosDetail"));
            },
            toclientes: function(){
                this.getSplitContObj().to(this.createId("ClientesDetail"));
            },
            togrupoobjs: function(){
                this.getSplitContObj().to(this.createId("GruposObjetivosDetail"));
            },
                    todatagrupoobjs: function(){
                        this.getSplitContObj().to(this.createId("DataGruposObjetivosDetail"));
                    },
            // navegador de personas
            toempleados: function(){
                this.getSplitContObj().to(this.createId("EmpleadosDetail"));
            },
            tosocionegocio: function(){
                this.getSplitContObj().to(this.createId("SocioNegocioDetail"));
            },
            // navegador de Campañas de venta
            tocampania: function(){
                this.getSplitContObj().to(this.createId("CampaniaDetail"));
            },
            togestioncontenido: function(){
                this.getSplitContObj().to(this.createId("GestionContenidoDetail"));
            },
            // navegador de Ventas
            toleads: function(){
                this.getSplitContObj().to(this.createId("LeadsDetail"));
            },
            tooportunidades: function(){
                this.getSplitContObj().to(this.createId("OportunidadesDetail"));
            },
            toforescasts: function(){
                this.getSplitContObj().to(this.createId("ForecastsDetail"));
            },
            topedidos: function(){
                this.getSplitContObj().to(this.createId("TomaPedidosDetail"));
            },
            tolistaprecios: function(){
                this.getSplitContObj().to(this.createId("ListaPreciosDetail"));
            },
                todatalistaprecios: function(){
                    this.getSplitContObj().to(this.createId("DataListaPreciosDetail"));
                },
                    todetallesdelproducto: function(){
                        this.getSplitContObj().to(this.createId("DetallesDelProducto"));
                    },
            // navegador de Actividades
            toreuniones: function(){
                this.getSplitContObj().to(this.createId("ReunionesDetail"));
            },
            tollamadas: function(){
                this.getSplitContObj().to(this.createId("LlamadasDetail"));
            },
            totareas: function(){
                this.getSplitContObj().to(this.createId("TareasDetail"));
            },
            toactividades: function(){
                this.getSplitContObj().to(this.createId("ActividadesDetail"));
            },
            toplanvisitas: function(){
                this.getSplitContObj().to(this.createId("VistasDetail"));
            },
                todataplanvisitas: function(){
                    this.getSplitContObj().to(this.createId("DataVistasDetail"));
                },
            torecordatorios: function(){
                this.getSplitContObj().to(this.createId("RecordatoriosDetail"));
            },
            ///// navegador Dashboards
            torutasvendedor: function(){
                this.getSplitContObj().to(this.createId("RutasVendedorDetail"));
            },
            tomonitoreocampo: function(){
                this.getSplitContObj().to(this.createId("MonitoreoCampoDetail"));
            },
            tovistaentidades: function(){
                this.getSplitContObj().to(this.createId("VistaEntidadesDetail"));
            },
            ///// navegador Reportes
            toreportes: function(){
                this.getSplitContObj().to(this.createId("ReportesDetail"));
            },
            tohaciendaacciones: function(){
                this.getSplitContObj().to(this.createId("HaciendaAccionesDetail"));
            },
            toestadistica: function(){
                this.getSplitContObj().to(this.createId("EstadisticaDetail"));
            },
            tovisualizacion: function(){
                this.getSplitContObj().to(this.createId("VisualizacionDetail"));
            },
            getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
            },
            backtoclientes: function(){
                this.getSplitContObj().to(this.createId("TomaPedidosDetail"));
            },
		press: function (evt) {
            var data = {};
            data.context = evt.getSource().getBindingContext();
            var selectedIndex = data.context.sPath.split("/")[2];
            console.log(data.context);
            console.log(selectedIndex);
            this.getSplitContObj().to(this.createId("ProductsClientesDetail"));
            var products=this.getView().getModel().getProperty("/list_clientes/" + selectedIndex  + "/products");
            console.log(products);

        }
                
		});
	});
