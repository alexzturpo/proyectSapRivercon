sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "sm/ui5smartagri/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("sm.ui5smartagri.Component", {
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
                    "lista1": [
                        {"nparte":"PR0000148","title":"2031","centro":"8413","estado":"","descripcion":"PEP-P01-05-1003-CA0201"},
                        {"nparte":"PR0000147","title":"2032","centro":"8413","estado":"","descripcion":"PEP-P01-05-1003-CA0203"},
                        {"nparte":"PR0000146","title":"2033","centro":"8413","estado":"","descripcion":"PEP-P01-05-1003-CA0205"}
                    ],
                    "T_liberarPep":[
                        {"prog":"00000016","lib":"sap-icon://flag","recurso":"sap-icon://bus-public-transport","orden":"00008000002","reserva":"","admin":"ADMINISTRACION HUAYTO","zona":"ZONA HUAYTO","campo":"1105A SAN ESTEBAN","quibre":"01","cultivo":"CANA","ciclo":"0201","etapa":"MATENIMIENTO DE CULTIVO","fecha":"01/04/2021","labor":"2031","desc":"control quimico de mezcla-maquina","ejercicio":"2021","semana":"1","proyecto":"p01"},
                        {"prog":"00000017","lib":"sap-icon://flag","recurso":"sap-icon://display-more","orden":"00008000002","reserva":"","admin":"ADMINISTRACION HUAYTO","zona":"ZONA HUAYTO","campo":"1105A SAN ESTEBAN","quibre":"01","cultivo":"CANA","ciclo":"0201","etapa":"MATENIMIENTO DE CULTIVO","fecha":"01/04/2021","labor":"2031","desc":"control quimico de mezcla-mano","ejercicio":"2021","semana":"1","proyecto":"p01"}
                    ],
                    "tableDiario":[
                        {"item":"001","cod":"000006","cantidad":"5000","trabajo":"SA_OBR_T","reserva":"000000","posreserva":"000","material":"","necesario":"","nparte":"PR0000148","descripcion":"control quimico de mezcla"},
                        {"item":"002","cod":"000006","cantidad":"5000","trabajo":"SA_OBR_T","reserva":"000000","posreserva":"000","material":"","necesario":"","nparte":"PR0000148","descripcion":"control quimico de mezcla"},
                        {"item":"003","cod":"000006","cantidad":"5000","trabajo":"SA_OBR_T","reserva":"000000","posreserva":"000","material":"","necesario":"","nparte":"PR0000147","descripcion":"control quimico de mezcla"},
                        {"item":"004","cod":"000006","cantidad":"5000","trabajo":"SA_OBR_T","reserva":"000000","posreserva":"000","material":"","necesario":"","nparte":"PR0000147","descripcion":"control quimico de mezcla"},
                        {"item":"005","cod":"000006","cantidad":"5000","trabajo":"SA_OBR_T","reserva":"000000","posreserva":"000","material":"","necesario":"","nparte":"PR0000146","descripcion":"control quimico de mezcla"}
                    ],
                    "tableDiarioSelec": [],
                    "T_data": [],
                    "T_semanaLaborselec": [],
                    "T_semanaDataselec": [],
                    "T_semanaLabor":[
                        {"labor":"2031","tipolabor":"control quimico","finicio":"24/01/2021","ffin":"24/01/2021","campo":"1008","tipocampo":"1105A SAN ES.","quibre":"1","cultivo":"CA","etapa":"M","campania":"201","pep":"P01-05-1008","nrogen":"000005","nroop":"1","nroapl":"","proyecto":"p1","administracion":"administracion huayto","semana":"1","zona":"","quiebre":""}
                        ],
                    "T_semanaData": [
                    {"colorEstado":"amarillo","programacion":"00000016","posprog":"1","indprog":"sap-icon://building","lib":"","estado":"0","administracion":"ADMINISTRACION","zona":"ZONA","campo":"1105A","quibre":"01","cultivo":"CAÑA","etapa":"M","campania":"0201","tipocampo":"","pep":"P01","labor":"2031","tipolabor":"SC03","nroapl":"","avance":"0.98","unidad":"HA","finicio":"","ffin":"","edad":"0","obs":"","duracion":"6.000"},
                    {"colorEstado":"amarillo","programacion":"00000017","posprog":"2","indprog":"sap-icon://display-more","lib":"","estado":"0","administracion":"ADMINISTRACION","zona":"ZONA","campo":"1105A","quibre":"01","cultivo":"CAÑA","etapa":"M","campania":"0201","tipocampo":"","pep":"P01","labor":"2031","tipolabor":"SC03","nroapl":"","avance":"0.98","unidad":"HA","finicio":"","ffin":"","edad":"0","obs":"","duracion":"6.000"},
                    {"colorEstado":"amarillo","programacion":"00000018","posprog":"3","indprog":"sap-icon://bus-public-transport","lib":"","estado":"0","administracion":"ADMINISTRACION","zona":"ZONA","campo":"1105a","quibre":"01","cultivo":"CAÑA","etapa":"M","campania":"0201","tipocampo":"","pep":"P01","labor":"2031","tipolabor":"SC03","nroapl":"","avance":"0.98","unidad":"HA","finicio":"","ffin":"","edad":"0","obs":"","duracion":"6.000"},
                    {"colorEstado":"amarillo","programacion":"00000019","posprog":"4","indprog":"sap-icon://eam-work-order","lib":"","estado":"0","administracion":"ADMINISTRACION","zona":"ZONA","campo":"1105a","quibre":"01","cultivo":"CAÑA","etapa":"M","campania":"0201","tipocampo":"","pep":"P01","labor":"2031","tipolabor":"SC03","nroapl":"","avance":"0.98","unidad":"HA","finicio":"","ffin":"","edad":"0","obs":"","duracion":"6.000"}
                    ],

                    "tbl_campoCarga": [
                        {"operacion":"90","ordenam":"900","elementopep":"P01-02-1001-00-CA-M","campo":"8001 ESPACH","labor":"2059","orden":"6000053","descLabor":"SA_CFR_P","nAplicacion":"2","precesor":"86 f1","rangoi":"001","rangof":"020","dias":"10500","toperacion":"MAQ","pos":"49","has":"1,00","cap":"8","ratio":"0,630","cantidad":"2785","um":"H","importe":"334,26"},
                        {"operacion":"90","ordenam":"901","elementopep":"P01-02-1001-00-CA-M","campo":"8002 ESPACH","labor":"2059","orden":"6000053","descLabor":"SA_DES_I","nAplicacion":"2","precesor":"87 f1","rangoi":"001","rangof":"020","dias":"10501","toperacion":"IMP","pos":"50","has":"1,01","cap":"8","ratio":"0,631","cantidad":"2786","um":"H","importe":"0"},
                        {"operacion":"92","ordenam":"910","elementopep":"P01-02-1001-00-CA-M","campo":"8002 ESPACH","labor":"2053","orden":"6000047","descLabor":"SA_CFR_P","nAplicacion":"2","precesor":"87 f1","rangoi":"001","rangof":"020","dias":"10500","toperacion":"MAQ","pos":"51","has":"1,02","cap":"8","ratio":"0,632","cantidad":"2787","um":"H","importe":"334,27"},
                        {"operacion":"92","ordenam":"911","elementopep":"P01-02-1001-00-CA-M","campo":"8003 ESPACH","labor":"2053","orden":"6000047","descLabor":"SA_DES_I","nAplicacion":"2","precesor":"88 f1","rangoi":"001","rangof":"020","dias":"10501","toperacion":"IMP","pos":"52","has":"1,03","cap":"8","ratio":"0,633","cantidad":"2788","um":"H","importe":"1"},
                        {"operacion":"94","ordenam":"920","elementopep":"P01-02-1001-00-CA-M","campo":"8003 ESPACH","labor":"2055","orden":"6000049","descLabor":"SA_CFR_P","nAplicacion":"2","precesor":"88 f1","rangoi":"001","rangof":"020","dias":"10500","toperacion":"MAQ","pos":"53","has":"1,04","cap":"8","ratio":"0,634","cantidad":"2789","um":"H","importe":"334,28"},
                        {"operacion":"94","ordenam":"921","elementopep":"P01-02-1001-00-CA-M","campo":"8004 ESPACH","labor":"2055","orden":"6000049","descLabor":"SA_DES_I","nAplicacion":"2","precesor":"89 f1","rangoi":"001","rangof":"020","dias":"10501","toperacion":"IMP","pos":"54","has":"1,05","cap":"8","ratio":"0,635","cantidad":"2790","um":"H","importe":"2"},
                        {"operacion":"96","ordenam":"910","elementopep":"P01-02-1001-00-CA-M","campo":"8004 ESPACH","labor":"2010","orden":"6000035","descLabor":"SA_CFR_P","nAplicacion":"2","precesor":"89 f1","rangoi":"001","rangof":"020","dias":"10500","toperacion":"MAQ","pos":"55","has":"1,06","cap":"8","ratio":"0,636","cantidad":"2791","um":"H","importe":"334,29"},
                        {"operacion":"96","ordenam":"911","elementopep":"P01-02-1001-00-CA-M","campo":"8005 ESPACH","labor":"2010","orden":"6000035","descLabor":"SA_DES_I","nAplicacion":"2","precesor":"90 f1","rangoi":"001","rangof":"020","dias":"10501","toperacion":"IMP","pos":"56","has":"1,07","cap":"8","ratio":"0,637","cantidad":"2792","um":"H","importe":"3"}
                        ] 
                }; 
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam");  
            }
        });
    }
);