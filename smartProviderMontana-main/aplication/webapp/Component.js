/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "spm/aplication/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("spm.aplication.Component", {
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
                    //data oficial 
                    "listTipoCarga":[
                        {key:"D", value:"Bienes"},
                        {key:"H", value:"Servicios/Activos"},
                    ],
                    "listTipoCargaFacRegistrada":[
                        {key:"", value:"Ninguno"},
                        {key:"D", value:"Suministros"},
                        {key:"H", value:"Servicios"},
                        {key:"M", value:"Sin vale/HES"},
                    ],
                    "listTipoDocumento":[
                        {key:"01", value:"Factura"},
                        {key:"07", value:"Nota de crédito"},
                        {key:"08", value:"Nota de debito"},
                    ],
                    "listMoneda":[
                        {key:"PEN", value:"Soles"},
                        {key:"USD", value:"Dolares"}
                    ],
                    "listTasaIgv":[
                        {key:"0", value:"0%"},
                        {key:"18", value:"18%"}
                    ],
                    //****************************** */
                    "tableFacturaElectro":[{value:"Test"}],
                    // "listaProveedoresUser":[],
                    "listUsuarios":[{"RUC":"1241412"}],
                    "listEmpresa":[{"RUC":"1241412"}],
                    "listProveedores":[{"RUC":"1241412"}],
                    "listServicios":[{"SERVICIO":"1241412"}],
                    "listEmpresasAssign":[{"ruc":"20131565659","descripcion":"TAL S.A"}],
                    "listAuditRol":[
                        {"key":"L","value":"LOGISTICA"},
                        {"key":"R","value":"RH"},
                        {"key":"SM","value":"SIGMA"},
                        {"key":"SG","value":"SIG"},
                        {"key":"P","value":"PROVEEDOR"},
                        {"key":"A","value":"ALL"},
                    ],
                    // "listConsultaResumenFactura":{"ID_FACTURA": 1,"CO_FACTURA":"cod001","TOTAL_IGV": 100.00,"EM_RUC":"ruc001","US_RUC":"prov001"},
                    // "listFactura":[
                    //     {"ID_FACTURA": 1,"FC_FEC_REGISTRO":"11/09/2023","TOTAL_IMP": 100.00,"NOM_DEM_RAZ_COMERCIAL":"ruc001","NOM_DEM_RAZ_ADQ":"prov001","EM_RUC":"ruc002","US_RUC":"prov002"}
                    // ]
                    "listItemFacturaPosicion":[
                        {"POSICION":"1","PRECIO_ING":100,"UND_MED":"PEN","CANTIDAD":"10","VALE":"VALE01","FEC_VALE":"13/10/2023","DE_HOJA_ENTRADA":"hoja01","DE_DOC_MATERIAL":"docMat01","DESCRIPCION":"descripciones","GUIA_REMISION":"emision01"},
                        {"POSICION":"2","PRECIO_ING":200,"UND_MED":"PEN","CANTIDAD":"20","VALE":"VALE02","FEC_VALE":"13/10/2023","DE_HOJA_ENTRADA":"hoja02","DE_DOC_MATERIAL":"docMat02","DESCRIPCION":"descripciones","GUIA_REMISION":"emision02"},
                        {"POSICION":"3","PRECIO_ING":300,"UND_MED":"PEN","CANTIDAD":"30","VALE":"VALE03","FEC_VALE":"13/10/2023","DE_HOJA_ENTRADA":"hoja03","DE_DOC_MATERIAL":"docMat03","DESCRIPCION":"descripciones","GUIA_REMISION":"emision03"},
                    ]

                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam"); 
            }
        });
    }
);