
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"posbtp/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("posbtp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
            this.setModel(models.createDeviceModel(), "device");
            var oData = {
				"aperturaPollVerdad": [],
				"totalTablaReproductora": [{
					"cantidad": "0"
				}],
                "list_cart":[],

                "list_produc":[
                    {"ProductName": "PORCELANATO ESMALTADO TREVERKHOME CASTAGNO MATE","Medida":"20X120 CM","type": "MARAZZI - ITALIA","Cod":"11013254","Stock": 2,"Price": 167.82,"imagen1":"../img/producto/produc1.jpg","imagen2":"../img/producto/produc1a.jpg"},
                    {"ProductName": "PORCELANATO ESMALTADO TREVERKHEART WHITE MATE","Medida":"15X90 CM","type": "MARAZZI - ITALIA","Cod":"11033887","Stock": 2,"Price": 169.47,"imagen1":"../img/producto/produc2.jpg","imagen2":"../img/producto/produc2a.png"},
                    {"ProductName": "PORCELANATO ESMALTADO ROCKING GREY RÚSTICO","Medida":"19.84X19.84 CM","type": "MARAZZI - ITALIA","Cod":"11033604","Stock": 2,"Price": 169.47,"imagen1":"../img/producto/produc3.jpg","imagen2":"../img/producto/produc3a.jpg"},
                    {"ProductName": "PORCELANATO ESMALTADO MEMO PIETRA ITALIA GRIGIO RÚSTICO","Medida":"20X40 CM","type": "MARAZZI - ITALIA","Cod":"11031599","Stock": 2,"Price": 213.21,"imagen1":"../img/producto/produc4.jpg","imagen2":"../img/producto/produc4a.jpg"},
                    {"ProductName": "PORCELANATO ESMALTADO PIETRA LAVAGNA RÚSTICO","Medida":"75X150 CM","type": "MARAZZI - ITALIA","Cod":"11028344","Stock": 2,"Price": 293.04,"imagen1":"../img/producto/produc5.jpg","imagen2":"../img/producto/produc5a.jpg"},
                    {"ProductName": "PORCELANATO ESMALTADO CEPPO DI GRE GREY MATE","Medida":"74.5X150 CM","type": "MARAZZI - ITALIA","Cod":"11033602","Stock": 2,"Price": 300.69,"imagen1":"../img/producto/produc6.jpg","imagen2":"../img/producto/produc6a.jpg"},
                    ],
                
                "list_ordenar":[
                    {"listId":1,"name":"Los más destacados"},
                    {"listId":2,"name":"Relevancia"},
                    {"listId":3,"name":"Más votados"},
                    {"listId":4,"name":"Nombres(Ascendentes)"},
                    {"listId":5,"name":"Nombres(Descendentes)"},
                    {"listId":6,"name":"Precios(Ascendentes)"},
                    {"listId":7,"name":"Precios(Descendentes)"}
                ],
                "list_ambiente":[
                    {"listId":1,"name":"Baño"},
                    {"listId":2,"name":"Cocina"},
                    {"listId":3,"name":"Sala - Comedor"},
                    {"listId":4,"name":"Dormitorio"},
                    {"listId":5,"name":"Terraza - Fachada"},
                    {"listId":5,"name":"Seleccione ambiente"}
                ]


            };

            var oModel = new sap.ui.model.json.JSONModel(oData);
			oModel.setSizeLimit(10000);
			this.setModel(oModel);
		}
	});
});