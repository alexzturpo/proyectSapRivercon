sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"salescloud/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("salescloud.Component", {

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
				"table_cuentas": [{"name":"Cuenta 1","city":"La paz","country":"Bolivia","mainContac":"Shurlock Durrell","registeredBy":"Julio Lira","state":"activo"},
                                {"name":"Cuenta 2","city":"La paz","country":"Bolivia","mainContac":"Hastie Kynman","registeredBy":"Julio Lira","state":"activo"},
                                {"name":"Cuenta 3","city":"Sucre","country":"Bolivia","mainContac":"Lauryn Lydden","registeredBy":"Julio Lira","state":"activo"},
                                {"name":"Cuenta4","city":"Sucre","country":"Bolivia","mainContac":"Waiter Chatto","registeredBy":"Julio Lira","state":"activo"},
                                {"name":"Cuenta 5","city":"Sucre","country":"Bolivia","mainContac":"Jillian Delgadillo","registeredBy":"Julio Lira","state":"activo"}],
				"table_contactos": [{"name":"Irwinn Furneaux","count":"Cuenta 1","role":"Construction Worker","area":"Crawler","telephone":"0168-0803","phone":"797-20-3011","state":"Activo"},
                                {"name":"Bowie Mitchenson","count":"Cuenta 2","role":"Engineer","area":"Trencher","telephone":"37000-275","phone":"306-80-9103","state":"Activo"}, 
                                {"name":"Benedetta Fyfield","count":"Cuenta 3","role":"Subcontractor","area":"Scraper","telephone":"49288-0051","phone":"180-11-8693","state":"Activo"},
                                {"name":"Ignaz Breadon","count":"Cuenta 4","role":"Construction Foreman","area":"Dump Truck","telephone":"0527-1768","phone":"718-09-6060","state":"Activo"},
                                {"name":"Uri Botly","count":"Cuenta 5","role":"Architect","area":"Bulldozer","telephone":"76214-047","phone":"813-72-1568","state":"Activo"}],
                /*"table_clientes":[{"name":"Irwinn Furneaux","telephone":"66582-321","phone":"697-06-4836","email":"pbatte0@taobao.com","address":"76739 Mesta Trail","state":false},
{"name":"Bowie Mitchenson","telephone":"64990-605","phone":"897-98-0559","email":"cdanilchev17@nih.gov","address":"240 Ridgeway Park","state":true},
{"name":"Benedetta Fyfield","telephone":"60913-999","phone":"171-47-9184","email":"fjotcham18@theglobeandmail.com","address":"7913 Darwin Hill","state":false},
{"name":"Ignaz Breadon","telephone":"52544-940","phone":"324-26-9115","email":"kfullard19@google.co.uk","address":"42469 Hoepker Lane","state":false},
{"name":"Uri Botly","telephone":"66758-130","phone":"166-54-9948","email":"hagus1a@cocolog-nifty.com","address":"27 Gale Plaza","state":true}],
*/
                "table_group":[{"name":"Grupo objetivo sector agricola","createdBy":"Julio Lira","changedBy":"Simonazzi","total":10,"state":"Activo","id":1},
{"name":"Grupo objetivo fetilizantes","createdBy":"Julio Lira","changedBy":"Woodings","total":44,"state":"Activo","id":44},
{"name":"Grupo objetivo maquinaria","createdBy":"Julio Lira","changedBy":"Rate","total":45,"state":"Activo","id":45},
{"name":"Grupo objetivo riego","createdBy":"Julio Lira","changedBy":"Boerderman","total":46,"state":true,"id":46},
{"name":"Grupo objetivo alimentacion","createdBy":"Julio Lira","changedBy":"Stonehewer","total":47,"state":"Activo","id":47},
{"name":"grupo objetivo haciendas","createdBy":"Julio Lira","changedBy":"Bettenson","total":48,"state":"Activo","id":48}],      
                "table_empleado":[{"name":"Patsy Fennelow","rol":"Nurse","Department":"Support","email":"pfennelow0@rivercon.com","telephone":"(309) 7166924","phone":"258 915 0203"},
{"name":"Cesare Clyma","rol":"Tax Accountant","Department":"Product Management","email":"cclyma18@rivercon.com","telephone":"(355) 7728591","phone":"761 178 3997"},
{"name":"Joshua Rossant","rol":"Librarian","Department":"Business Development","email":"jrossant19@rivercon.com","telephone":"(564) 6625027","phone":"124 323 5762"},
{"name":"Rafe Pearl","rol":"Dental Hygienist","Department":"Accounting","email":"rpearl1a@rivercon.com","telephone":"(288) 1705530","phone":"296 980 6754"},
{"name":"Seward Greenhow","rol":"Occupational Therapist","Department":"Sales","email":"sgreenhow1b@rivercon.com","telephone":"(435) 5338488","phone":"917 379 4335"},
{"name":"Leta Bettaney","rol":"Quality Control Specialist","Department":"Support","email":"lbettaney1c@rivercon.com","telephone":"(125) 4363726","phone":"591 447 3449"},
                            {"name":"Vail Drover","rol":"Quality Control Specialist","Department":"Business Development","email":"vdrover1d@rivercon.com","telephone":"(342) 6170444","phone":"249 269 6275"}],
                "table_socios":[{"namepartner":"Stavro Fenty","state":"Activo","city":"Sucre","country":"Bolivia","contact":"Stavro","namecontact":"Collins, Zemlak and Parisian","telephone":"(481) 5863585","phone":"377 684 3799","email":"sfenty@company.com"},
{"namepartner":"Zebadiah Shoubridge","state":"Activo","city":"La paz","country":"Bolivia","contact":"Zebadiah","namecontact":"Schuster LLC","telephone":"(606) 5804202","phone":"400 954 8292","email":"zshoubridge1@company.com"},
{"namepartner":"Claudian Coppock.","state":"Activo","city":"La paz","country":"Bolivia","contact":"Claudian","namecontact":"Haley-Bins","telephone":"(397) 6375487","phone":"838 894 3568","email":"ccoppock2@company.com"},
{"namepartner":"Ray Bycraft","state":"Activo","city":"La paz","country":"Bolivia","contact":"Ray","namecontact":"Hettinger-McLaughlin","telephone":"(669) 7669959","phone":"368 109 3742","email":"rbycraft3@company.com"},
{"namepartner":"Fabian Sivewright","state":"Activo","city":"Sucre","country":"Bolivia","contact":"Fabian","namecontact":"Hilpert LLC","telephone":"(241) 2462981","phone":"772 750 8978","email":"fsivewright4@company.com"},
{"namepartner":"Stillman Eschalotte","state":"Activo","city":"Sucre","country":"Bolivia","contact":"Stillman","namecontact":"Schroeder-Torp","telephone":"(278) 1299713","phone":"978 419 6427","email":"seschalotte5@company.com"}],
                "table_campania":[{"name":"Campaña 2021 enero","channel":"Telefono","target":"Grupo objetivo fetilizantes","state":"activo","execution":"en proceso","responsable":"Olivette"},
{"name":"Campaña 2021 enero","channel":"Telefono","target":"Grupo objetivo maquinaria","state":"activo","execution":"en proceso","responsable":"Nicholle"},
{"name":"Campaña 2021 febrero","channel":"Telefono","target":"Grupo objetivo fetilizantes","state":"activo","execution":"en proceso","responsable":"Jobie"},
{"name":"Campaña 2021 marzo","channel":"Telefono","target":"Grupo objetivo riego","state":"activo","execution":"en proceso","responsable":"Gerry"},
{"name":"Campaña 2021 abril","channel":"Telefono","target":"Grupo objetivo alimentacion","state":"activo","execution":"en proceso","responsable":"Feliza"},
{"name":"Campaña 2021 mayo","channel":"Telefono","target":"Grupo objetivo agricola","state":"activo","execution":"en proceso","responsable":"Zoe"},
{"name":"Campaña 2021 junio","channel":"Telefono","target":"Grupo objetivo haciendas","state":"activo","execution":"en proceso","responsable":"Dion"}],
                "table_gestioncontenido":[{"name":"Reclarmo por mora 5 dias","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "},
{"name":"Reclamo por mora 15 dias","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "},
{"name":"Reclamo por mora 30 dias","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "},
{"name":"Reclamo por mora 45 dias","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "},
{"name":"Preaviso de suspension","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "},
{"name":"Aviso de suspension","state":"Activo","content":"Plantilla de correo electronico","category":"Otros","createBy":"Julio Lira ","modifiedBy":"Julio Lira "}],
                "table_leads":[{"namelead":"Tres-Zap","namecontact":"Darren","capaniacliente":"Campaña 2021 febrero","nivelcalificacion":"frio","state":"abierto","priority":"normal","startdate":"4/12/2021","finishdate":"5/12/2021","responsable":"Darren Ormrod"},
{"namelead":"Bigtax","namecontact":"Lyle","capaniacliente":"Cuenta 1","nivelcalificacion":"tibio","state":"abierto","priority":"normal","startdate":"29/8/2020","finishdate":"29/8/2021","responsable":"Lyle Summerfield"},
{"namelead":"Greenlam","namecontact":"Osborn","capaniacliente":"Cuenta 2","nivelcalificacion":"frio","state":"abierto","priority":"normal","startdate":"13/12/2020","finishdate":"16/12/2021","responsable":"Osborn Edmead"},
{"namelead":"Greenlam","namecontact":"Denny","capaniacliente":"Campaña 2021 febrero","nivelcalificacion":"tibio","state":"abierto","priority":"normal","startdate":"15/1/2021","finishdate":"29/1/2021","responsable":"Denny Loding"},
{"namelead":"Greenlam","namecontact":"Alistair","capaniacliente":"Campaña 2021 enero","nivelcalificacion":"frio","state":"abierto","priority":"normal","startdate":"9/12/2020","finishdate":"12/12/2020","responsable":"Alistair Grogona"},
{"namelead":"Bamity","namecontact":"Weider","capaniacliente":"Campaña 2021 marzo","nivelcalificacion":"caliente","state":"abierto","priority":"normal","startdate":"12/11/2020","finishdate":"14/11/2021","responsable":"Weider Simonaitis"},
{"namelead":"Ronstring","namecontact":"Simone","capaniacliente":"Campaña 2021 junio","nivelcalificacion":"caliente","state":"abierto","priority":"normal","startdate":"3/9/2020","finishdate":"12/9/2020","responsable":"Simone Manuello"}],
                "table_oportunidades":[{"name":"Cookley","accounts":"Forrester","closingdate":"10/31/2020","sales":"oportunidad identificada","responsable":"Forrester Blundin","state":"Abierto"},
{"name":"Bamity","accounts":"Reynold","closingdate":"24/7/2021","sales":"oportunidad identificada","responsable":"Reynold Dunstall","state":"Abierto"},
{"name":"Zamit","accounts":"Karl","closingdate":"12/11/2020","sales":"oportunidad identificada","responsable":"Karl Keppel","state":"Abierto"},
{"name":"Biodex","accounts":"Inglis","closingdate":"3/3/2021","sales":"oportunidad identificada","responsable":"Inglis Tofano","state":"Abierto"},
{"name":"Gembucket","accounts":"Boniface","closingdate":"7/7/2021","sales":"oportunidad identificada","responsable":"Boniface Auty","state":"Abierto"},
{"name":"Namfix","accounts":"Gerhardt","closingdate":"17/1/2021","sales":"oportunidad identificada","responsable":"Gerhardt Stamp","state":"Abierto"}],
                "table_forecasts":[{"name":"Forecast 2021T1","responsable":"Kiersten Shepton","moneda":"peso boliviano","from":"01/01/2021","until":"31/03/2021"},
{"name":"Forecast 2021T2","responsable":"Kim Moscrop","moneda":"peso boliviano","from":"10/03/2021","until":"12/06/2021"},
{"name":"Forecast 2021H1","responsable":"Rafaela Tytcomb","moneda":"peso boliviano","from":"5/06/2020","until":"23/10/2020"}],
                "table_listaprecios":[{"name":"lista de precio 202101","moneda":"peso boliviano","from":"1/1/2021","until":"31/1/2021"},
{"name":"lista de precios 202102","moneda":"peso boliviano","from":"1/2/2021","until":"28/2/2021"},
{"name":"lista de precios 202103","moneda":"peso boliviano","from":"1/3/2021","until":"31/3/2021"},
{"name":"lista de precios 202104","moneda":"peso boliviano","from":"1/4/2021","until":"30/4/2021"},
{"name":"lista de precios 202105","moneda":"peso boliviano","from":"1/5/2021","until":"31/5/2021"},
{"name":"lista de precios 202106","moneda":"peso boliviano","from":"1/6/2021","until":"30/6/2021"}],
                "table_reuniones":[{"nombre":"Reuniones por hacienda y status","asunto":"reunion de revision 20210801","state":"realizado","startdate":"17/4/2021","enddate":"17/4/2021","accounts":"Cuenta 1","maincontact":"Stoppe","telephono":"686-237-8567","note":"-"},
{"nombre":"Estadísticas de visitas y rutas","asunto":"reunion de revision 20210802","state":"realizado","startdate":"18/9/2020","enddate":"18/9/2021","accounts":"Cuenta 2","maincontact":"Reven","telephono":"477-763-9968","note":"-"},
{"nombre":"Visualización de cliente, mora y crédito disponible","asunto":"reunion de revision 20210803","state":"realizado","startdate":"26/1/2021","enddate":"26/1/2021","accounts":"Cuenta 3","maincontact":"McMichell","telephono":"146-120-9317","note":"-"}],

"table_haciendaestatus":[{"hacienda":"hacienda 1","asunto":"Reunion de seguimiento","state":"realizado","startdate":"10/01/2021","enddate":"17/4/2021","accounts":"Ruta 20210110 Willie McKimm","maincontact":"Stoppe","telephono":"686-237-8567","note":"forecast"},
{"hacienda":"hacienda 2","asunto":"Reunion de seguimiento","state":"realizado","startdate":"10/02/2021","enddate":"18/9/2021","accounts":"Ruta 20210210 Kristos Hainge","maincontact":"Reven","telephono":"477-763-9968","note":"local area network"},
{"hacienda":"hacienda 2","asunto":"Reunion de seguimiento","state":"realizado","startdate":"10/03/2021","enddate":"18/9/2021","accounts":"Ruta 20210310 Roi Rojel","maincontact":"Reven","telephono":"477-763-9968","note":"local area network"},
{"hacienda":"hacienda 3","asunto":"Reunion de seguimiento","state":"realizado","startdate":"15/04/2021","enddate":"26/1/2021","accounts":"Ruta 20210415 Woodman Riordan","maincontact":"McMichell","telephono":"146-120-9317","note":"neutral"}],

                "table_llamadas":[{"asunto":"Health Coach I","state":"realizado","startdate":"25/7/2021","responsable":"Whitlow","client":"Cuenta 1","telephono":"108-711-8529","note":"tertiary"},
{"asunto":"Technical Writer","state":"realizado","startdate":"22/1/2021","responsable":"Woodroffe","client":"Cuenta 2","telephono":"101-799-6252","note":"tertiary"},
{"asunto":"Research Nurse","state":"realizado","startdate":"7/9/2020","responsable":"Tyce","client":"Cuenta 4","telephono":"856-338-7712","note":"Graphical User Interface"},
{"asunto":"Environmental Tech","state":"realizado","startdate":"15/5/2021","responsable":"Kulic","client":"Cuenta 5","telephono":"935-301-7100","note":"Optimized"},
{"asunto":"Administrative Officer","state":"realizado","startdate":"12/5/2021","responsable":"Robke","client":"Cuenta 7","telephono":"109-672-2758","note":"circuit"}],
                "table_tareas":[{"asunto":"Chief Design Engineer","state":"realizado","startdate":"7/8/2021","expirationdate":"12/8/2021","enddate":"12/8/2021","accounts":"Cuenta 1","telephono":"466-867-8287","responsable":"Clem","createby":"Julio Lira","updateby":"Julio Lira","completby":"100%","note":"service-desk"},
{"asunto":"Legal Assistant","state":"realizado","startdate":"24/1/2021","expirationdate":"29/1/2021","enddate":"29/1/2021","accounts":"Cuenta 2","telephono":"248-227-9166","responsable":"Leela","createby":"Julio Lira","updateby":"Julio Lira","completby":"100%","note":"Automated"},
{"asunto":"Analyst Programmer","state":"realizado","startdate":"3/4/2021","expirationdate":"8/4/2021","enddate":"8/4/2021","accounts":"Cuenta 3","telephono":"160-910-9201","responsable":"Cassandry","createby":"Julio Lira","updateby":"Julio Lira","completby":"100%","note":"Organic"},
{"asunto":"Structural Analysis Engineer","state":"realizado","startdate":"23/10/2020","expirationdate":"28/10/2021","enddate":"28/10/2021","accounts":"Cuenta 4","telephono":"708-700-0333","responsable":"Shelden","createby":"Julio Lira","updateby":"Julio Lira","completby":"100%","note":"core"},
{"asunto":"Geologist I","state":"realizado","startdate":"16/8/2021","expirationdate":"21/8/2021","enddate":"21/8/2021","accounts":"Cuenta 5","telephono":"730-998-8222","responsable":"Mellisa","createby":"Julio Lira","updateby":"Julio Lira","completby":"100%","note":"system engine"}],
                "table_actividades":[{"name":"lista de reuniones 20210102","type":"lista de reuniones","state":"Realizado","responsable":"Julio Lira","startdate":"5/22/2021","numberactivity":1,"createby":"Julio Lira","updateby":"Julio Lira"},
{"name":"lista de llamadas 20210102","type":"lista de tareas","state":"Realizado","responsable":"Julio Lira","startdate":"5/15/2021","numberactivity":2,"createby":"Julio Lira","updateby":"Julio Lira"},
{"name":"lista de tareas 20210102","type":"lista de llamadas","state":"Realizado","responsable":"Julio Lira","startdate":"2/19/2021","numberactivity":3,"createby":"Julio Lira","updateby":"Julio Lira"}],
                "table_vistas":[{"name":"Ruta 20210110 Willie McKimm","startday":"10/01/2021","endday":"11/01/2021","responsable":"Willie","createby":"Julio Lira","state":"Realizado"},
{"name":"Ruta 20210210 Kristos Hainge","startday":"10/02/2021","endday":"11/02/2021","responsable":"Kristos","createby":"Julio Lira","state":"Realizado"},
{"name":"Ruta 20210310 Roi Rojel","startday":"10/03/2021","endday":"11/03/2021","responsable":"Roi","createby":"Julio Lira","state":"Realizado"},
{"name":"Ruta 20210415 Woodman Riordan","startday":"15/04/2021","endday":"16/04/2021","responsable":"Woodman","createby":"Julio Lira","state":"Realizado"}],
                "table_recordatorios":[{"client":"Karlen Franzolini","factura":"0378-5501","monto":"5000","statefactura":"pendiente","experydate":"10/07/2021","delaynumber":30,"lastmanagementdate":"10/06/2021","lastmanagementcoment":"Llamar en 40 días","state":"Pendiente ","note":"Mylan Pharmaceuticals Inc.","aviso":"Skibox"},
{"client":"Dee Freiburger","factura":"53808-0979","monto":"4000","statefactura":"pendiente","experydate":"30/06/2021","delaynumber":70,"lastmanagementdate":"30/05/2021","lastmanagementcoment":"Llamar en 40 días","state":"Pendiente ","note":"State of Florida DOH Central Pharmacy","aviso":"Camido"},
{"client":"Annalise McVicar","factura":"55289-593","monto":"1500","statefactura":"pendiente","experydate":"15/07/2021","delaynumber":25,"lastmanagementdate":"15/06/2021","lastmanagementcoment":"Llamar en 40 días","state":"Pendiente ","note":"PD-Rx Pharmaceuticals, Inc.","aviso":"Kare"}],
                "table_groupData":[{"idcuenta":1,"namecuenta":"Cuenta 1","contact":"Mårten","address":"Santa Cruz / BO"},
{"idcuenta":2,"namecuenta":"Cuenta 2","contact":"Françoise","address":"Santa Cruz / BO"},
{"idcuenta":3,"namecuenta":"Cuenta 3","contact":"Marylène","address":"Santa Cruz / BO"},
{"idcuenta":4,"namecuenta":"Cuenta 4","contact":"Desirée","address":"Santa Cruz / BO"},
{"idcuenta":5,"namecuenta":"Cuenta 5","contact":"Lucrèce","address":"Santa Cruz / BO"},
{"idcuenta":6,"namecuenta":"Cuenta 6","contact":"Yú","address":"Santa Cruz / BO"},
{"idcuenta":7,"namecuenta":"Cuenta 7","contact":"Almérinda","address":"Santa Cruz / BO"},
{"idcuenta":8,"namecuenta":"Cuenta 8","contact":"Gaëlle","address":"Santa Cruz / BO"},
{"idcuenta":9,"namecuenta":"Cuenta 9","contact":"Véronique","address":"Santa Cruz / BO"},
                                {"idcuenta":10,"namecuenta":"Cuenta 10","contact":"Yú","address":"Santa Cruz / BO"}],
                "table_datacuentas":[{"name":"Sidoney Stoney","rol":"Project Manager","telephone":"840-113-5072","email":"sstoney0@company.com "},
{"name":"Cristine Birtwell","rol":"Project Manager","telephone":"875-692-6813","email":"cbirtwell1@company.com "}],
                "table_datacuentasdirecciones":[{"address":"Direccion de bolivia de santacruz","telephone":"794-864-5099","principal":"No"},
{"address":"Direccion de bolivia de santacruz","telephone":"226-418-5215","principal":"Si"}],
                "table_datalistaprecios":[{"codproducto":"58118","description":"Removal of Drainage Device from Upper Bone, Perc Approach","monto":"120","preciounidad":"12"},
{"codproducto":"17271","description":"Drainage of L Ant Tib Art, Perc Endo Approach, Diagn","monto":"240","preciounidad":"24"},
{"codproducto":"595720","description":"Insert Intralum Dev in L Less Saphenous, Perc Endo","monto":"360","preciounidad":"26"}],
                "table_datavistas":[{"date":"10/01/2021 ","account":"Cuenta 1","timetravel":"60 min","timepreparation":"0 min","starttime":"9:00 AM","duration":"60 min","endtime":"10:00 AM"},
{"date":"10/01/2021","account":"Cuenta 2","timetravel":"60 min","timepreparation":"0 min","starttime":"11:00 AM","duration":"120 min","endtime":"01:00 PM"},
{"date":"10/01/2021","account":"Cuenta  3","timetravel":"60 min","timepreparation":"0 min","starttime":"03:00 PM","duration":"180 min","endtime":"06:00 PM"},
{"date":"11/01/2021","account":"Cuenta  4","timetravel":"60 min","timepreparation":"0 min","starttime":"9:00 AM","duration":"60 min","endtime":"10:00 AM"},
{"date":"11/01/2021","account":"Cuenta  5","timetravel":"60 min","timepreparation":"0 min","starttime":"11:00 AM","duration":"120 min","endtime":"01:00 PM"},
                                {"date":"11/01/2021","account":"Cuenta  6","timetravel":"60 min","timepreparation":"0 min","starttime":"03:00 PM","duration":"180 min","endtime":"06:00 PM"}],
                "list_select":[{"listId":"1","vendedor":"Huberto Longo","zona":"America/Guatemala","hacienda":"Beijing University of Science and Technology"},
                            {"listId":"2","vendedor":"Seamus Domico","zona":"America/Sao_Paulo","hacienda":"Capilano College"},
                            {"listId":"3","vendedor":"Sunny Crick","zona":"Asia/Kuala_Lumpur","hacienda":"Université de Thiès"},
                            {"listId":"4","vendedor":"Consuelo Giocannoni","zona":"Africa/Casablanca","hacienda":"École des Hautes Études Commerciales"},
                            {"listId":"5","vendedor":"Carline Stanlock","zona":"America/Toronto","hacienda":"Hardin-Simmons University"}],
                
                "list_empresas":[{"empresa":"Blogtag","nombre":"Renée","address":"675 Elgar Road"},
{"empresa":"Demizz","nombre":"Jú","address":"79 Merrick Circle"},
{"empresa":"Rooxo","nombre":"Cléopatre","address":"7 Corry Avenue"},
{"empresa":"Leexo","nombre":"Almérinda","address":"648 Mallory Alley"},
{"empresa":"Omba","nombre":"Eloïse","address":"92442 Porter Parkway"}],

"table_estadistica":[{"visitas":3,"distancia":"30km","asunto":"reunion de revision 20210801","state":"realizado","startdate":"17/4/2021","enddate":"17/4/2021","accounts":"vstoppe0","maincontact":"Stoppe","telephono":"686-237-8567","note":"forecast"},
{"visitas":3,"distancia":"42km","asunto":"reunion de revision 20210802","state":"realizado","startdate":"18/9/2020","enddate":"18/9/2021","accounts":"kreven1","maincontact":"Reven","telephono":"477-763-9968","note":"local area network"},
{"visitas":3,"distancia":"67km","asunto":"reunion de revision 20210802","state":"realizado","startdate":"18/9/2020","enddate":"18/9/2021","accounts":"kreven1","maincontact":"Reven","telephono":"477-763-9968","note":"local area network"},
{"visitas":3,"distancia":"85km","asunto":"reunion de revision 20210803","state":"realizado","startdate":"26/1/2021","enddate":"26/1/2021","accounts":"cmcmichell2","maincontact":"McMichell","telephono":"146-120-9317","note":"neutral"}],
"list_visualizacion":[{"accounts":"Cuenta 8","mora":"100","credito":"200","note":"forecast"},
{"accounts":"Cuenta 9","mora":"200","credito":"400","note":"local area network"},
{"accounts":"Cuenta 10","mora":"1000","credito":"1000","note":"neutral"}],

                "list_productos":[{"ProductName": "Pineapple","Quantity": 1,"ExtendedPrice": 87.29,"ShipperName": "Fun Inc.","ShippedDate": "2015-04-01T00:00:00", "Status": "A"},
  {"ProductName": "Milk","Quantity": 1,"ExtendedPrice": 9.99,"ShipperName": "ACME","ShippedDate": "2015-02-18T00:00:00","Status": "B"},
  {"ProductName": "Canned Beans","Quantity": 1,"ExtendedPrice": 6.850,"ShipperName": "ACME","ShippedDate": "2015-03-02T00:00:00","Status": "B"},
  {"ProductName": "Salad","Quantity": 1,"ExtendedPrice": 8.89,"ShipperName": "ACME","ShippedDate": "2015-04-12T00:00:00","Status": "C"},
  {"ProductName": "Bread", "Quantity": 1,"ExtendedPrice": 2.712,"ShipperName": "Fun Inc.","ShippedDate": "2015-01-27T00:00:00","Status": "A"}],
  
  "table_clientes":[{"name":"Irwinn Furneaux","telephone":"66582-321","phone":"697-06-4836","email":"pbatte0@company.com","address":"Santa Cruz","state":"Activo","productos":[{"ProductName": "Pineapple","Quantity": 1,"ExtendedPrice": 87.2000,"ShipperName": "Fun Inc.","ShippedDate": "2015-04-01T00:00:00", "Status": "A"},
{"ProductName": "Milk","Quantity": 1,"ExtendedPrice": 9.99999,"ShipperName": "ACME","ShippedDate": "2015-02-18T00:00:00","Status": "B"}]},
{"name":"Bowie Mitchenson","telephone":"64990-605","phone":"897-98-0559","email":"cdanilchev17@company.com","address":"Santa Cruz","state":"Activo" ,"productos":[{"ProductName": "Milk","Quantity": 1,"ExtendedPrice": 9.99999,"ShipperName": "ACME","ShippedDate": "2015-02-18T00:00:00","Status": "B"},
{"ProductName": "Canned Beans","Quantity": 1,"ExtendedPrice": 6.85000,"ShipperName": "ACME","ShippedDate": "2015-03-02T00:00:00","Status": "B"}]},
{"name":"Benedetta Fyfield","telephone":"60913-999","phone":"171-47-9184","email":"fjotcham18@company.com","address":"Santa Cruz","state":"Activo" ,"productos":[{"ProductName": "Canned Beans","Quantity": 1,"ExtendedPrice": 6.85000,"ShipperName": "ACME","ShippedDate": "2015-03-02T00:00:00","Status": "B"},
{"ProductName": "Salad","Quantity": 1,"ExtendedPrice": 8.8000,"ShipperName": "ACME","ShippedDate": "2015-04-12T00:00:00","Status": "C"}]},
{"name":"Ignaz Breadon","telephone":"52544-940","phone":"324-26-9115","email":"kfullard19@company.com","address":"Santa Cruz","state":"Activo" ,"productos":[{"ProductName": "Salad","Quantity": 1,"ExtendedPrice": 8.8000,"ShipperName": "ACME","ShippedDate": "2015-04-12T00:00:00","Status": "C"},
{"ProductName": "Bread", "Quantity": 1,"ExtendedPrice": 2.71212,"ShipperName": "Fun Inc.","ShippedDate": "2015-01-27T00:00:00","Status": "A"}]},
{"name":"Uri Botly","telephone":"66758-130","phone":"166-54-9948","email":"hagus1a@company.com","address":"Santa Cruz","state":"Activo" ,"productos":[{"ProductName": "Salad","Quantity": 1,"ExtendedPrice": 8.8000,"ShipperName": "ACME","ShippedDate": "2015-04-12T00:00:00","Status": "C"},
{"ProductName": "Bread", "Quantity": 1,"ExtendedPrice": 2.71212,"ShipperName": "Fun Inc.","ShippedDate": "2015-01-27T00:00:00","Status": "A"}]}]


                        };
            var oModel = new sap.ui.model.json.JSONModel(oData);
			oModel.setSizeLimit(10000);
			this.setModel(oModel);
		}
	});
});
