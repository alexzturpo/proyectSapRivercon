
sap.ui.define([
"sap/ui/core/mvc/Controller",
"sap/ui/core/Fragment"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Fragment) {
		"use strict";

		return Controller.extend("posbtp.controller.Home", {
			onInit: function () {
            },
            opencarrito : function () {
                var oView = this.getView();
                // create dialog lazily
                if (!this.byId("helloCarrito")) {
                    // load asynchronous XML fragment
                    Fragment.load({
                        id: oView.getId(),
                        name: "posbtp.view.carrito",
					    controller: this
                    }).then(function (oDialog) {
                        // connect dialog to the root view of this component (models, lifecycle)
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("helloCarrito").open();
                }
            }, 
            onCloseDialog : function () {
                this.byId("helloCarrito").close();
            },

            
            //  saltos de paneles POS
            toproductos: function(){
                this.getSplitContObj().to(this.createId("ProductosDetail"));
            },
            todetalleproducto: function(evt){
                var data = {};
                data.context = evt.getSource().getBindingContext();
                var selectedIndex = data.context.sPath.split("/")[2];
                //console.log(data.context);
                //console.log(selectedIndex);
                this.getSplitContObj().to(this.createId("ProductsInfoDetail"));
                
                var products=this.getView().getModel().getProperty("/list_produc/" + selectedIndex);
                 this.getView().getModel().setProperty("/list_select_produc/",products);
                var dataproduct = this.getView().getModel();
                //console.log(products);
                //console.log(dataproduct); 
            },
            aniadircarrito:function(){
                var products=this.getView().getModel().getProperty("/list_select_produc/");
                console.log(products);
                var cart=this.getView().getModel().getProperty("/list_cart/");
                var tam=cart.length;
                var vector =[];
                var llave= {};
                console.log(cart);
                llave.Cod  = products.Cod;           
                llave.Medida = products.Medida;
                llave.Price = products.Price;
                llave.ProductName = products.ProductName;
                llave.Stock = products.Stock;
                llave.imagen1 = products.imagen1;
                llave.imagen2 = products.imagen2;
                llave.type = products.type;
                vector.push(llave);
                cart=this.getView().getModel().setProperty("/list_cart/"+ tam +"/", llave);
                var result=this.getView().getModel().getProperty("/list_cart/");
                console.log(result);
                console.log(vector);
                console.log(cart);
                console.log(tam);
            },





            //  saltos de paneles 
                //navegador de clientes
            tohome: function(){
                this.getSplitContObj().to(this.createId("HomeDetail"));
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
            
            //direeccionamiento a catalogo
            toCatalogo: function(){
                this.getSplitContObj().to(this.createId("CatalogoDetail"));
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

        },
		pressCar: function (evt) {
            var data = {};
            data.context = evt.getSource().getBindingContext();
            var selectedIndex = data.context.sPath.split("/")[2];
            console.log(data.context);
            console.log(selectedIndex);
            //this.getSplitContObj().to(this.createId("ProductsClientesDetail"));
            //var products=this.getView().getModel().getProperty("/list_clientes/" + selectedIndex  + "/products");
            //console.log(products);

        },

        handleSwitchOrientation: function(oEvent) {
        var sOrientation = this.byId("mySplitContainer").getOrientation();
        if (sOrientation == "Vertical") {
            sOrientation = "Horizontal";
        } else {
            sOrientation = "Vertical";
        }
        this.byId("mySplitContainer").setOrientation(sOrientation);
		},

		handleToggleSecondaryContent: function(oEvent) {
			var oSplitContainer = this.byId("mySplitContainer");
			oSplitContainer.setShowSecondaryContent(!oSplitContainer.getShowSecondaryContent());
        }/*,
        onCollapseExpandPress: function () {
			var oNavigationList = this.byId('navigationList');
			var bExpanded = oNavigationList.getExpanded();

			oNavigationList.setExpanded(!bExpanded);
		},*/
                
		});
	});
