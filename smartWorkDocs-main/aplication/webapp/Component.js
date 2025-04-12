/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "swd/aplication/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("swd.aplication.Component", {
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
                  "listUsuarios":[{"RUC":"1241412"}],
                  "listEmpresa":[{"RUC":"1241412"}],
                  "listProveedores":[{"RUC":"1241412"}],
                  "listServicios":[{"SERVICIO":"1241412"}],
                  "listEmpresasAssign":[{"ruc":"20131565659","descripcion":"TAL S.A"}],
                  
                    "tbDataPedidos":[
                        {
                          "OPERACION": "E-00001",
                          "PEDIDO": "20000001",
                          "OBSERVACION": "",
                          "FECHA_TRANSMISION": "21/07/2023",
                          "FECHA_EMISION": "1/07/2023",
                          "FECHA_PROGRAMACION": "29/07/2023",
                          "CODIGO_CLIENTE": "1000001",
                          "RAZON_SOCIAL_CLIENTE": "PECUARIO HONDURENA",
                          "CONDICION_PAGO": "Letra 105 días",
                          "REFERENCIA_CLIENTE": "CV-1216515",
                          "MODALIDAD_EMBARQUE": "MARITIMO",
                          "TOTAL_PEDIDO_COBR": "71303.5"
                        },
                        {
                          "OPERACION": "E-00002",
                          "PEDIDO": "20000002",
                          "OBSERVACION": "",
                          "FECHA_TRANSMISION": "20/07/2023",
                          "FECHA_EMISION": "1/07/2023",
                          "FECHA_PROGRAMACION": "29/07/2023",
                          "CODIGO_CLIENTE": "1000001",
                          "RAZON_SOCIAL_CLIENTE": "PECUARIO HONDURENA",
                          "CONDICION_PAGO": "Letra 105 días",
                          "REFERENCIA_CLIENTE": "CV-1216513",
                          "MODALIDAD_EMBARQUE": "MARITIMO",
                          "TOTAL_PEDIDO_COBR": "70151.2"
                        }
                    ],
                    "tbDataOperacion":[{
                        "OPERACION": "E-00001",
                        "FECHA_PROGRAMACION": "29/07/2023",
                        "CODIGO_CLIENTE": "10000001",
                        "RAZON_SOCIAL_CLIENTE": "PECUARIA HONDURENA",
                        "MODALIDAD_EMBARQUE": "MARITIMO",
                        "ESTADO": ""
                      },
                      {
                        "OPERACION": "E-00002",
                        "FECHA_PROGRAMACION": "29/07/2023",
                        "CODIGO_CLIENTE": "10000002",
                        "RAZON_SOCIAL_CLIENTE": "PECUARIA HONDURENA",
                        "MODALIDAD_EMBARQUE": "AEREO",
                        "ESTADO": ""
                      }],
                    "tbDataDetailPedido":[{
                      "OPERACION": "",
                      "RAZON_SOCIAL": "",
                      "INCOTERMS": "",
                      "OPERADOR_LOGISTICO": "",
                      "ENVIO_DOC_ORIGINAL": "",
                      "ITAB_DETALLE_PEDIDO": "",
                    
                      "PEDIDO": "200001",
                      "POSICION": "10",
                      "COD_MATERIAL": "40000001",
                      "DESCRIPCION": "PRODUCTO A",
                      "CANTIDAD_ORDENADA": "1500",
                      "PRESENTACION": "UN",
                      "CENTRO": "1101",
                      "ALMACEN": "1010",
                      "PARTIDA_ARANCELARIA": "PA-89511",
                      "FECHA_VENCIMIENTO_DECLARACION_JURADA": "DJ-99532"
                    },
                    {
                      "OPERACION": "",
                      "RAZON_SOCIAL": "",
                      "INCOTERMS": "",
                      "OPERADOR_LOGISTICO": "",
                      "ENVIO_DOC_ORIGINAL": "",
                      "ITAB_DETALLE_PEDIDO": "",
                    
                      "PEDIDO": "200001",
                      "POSICION": "20",
                      "COD_MATERIAL": "40000001",
                      "DESCRIPCION": "PRODUCTO B",
                      "CANTIDAD_ORDENADA": "500",
                      "PRESENTACION": "UN",
                      "CENTRO": "1101",
                      "ALMACEN": "1010",
                      "PARTIDA_ARANCELARIA": "PA-89511",
                      "FECHA_VENCIMIENTO_DECLARACION_JURADA": "DJ-965447"
                    }
                    ],
                    "LIST_DOC_EXPORTACION": [
                      {
                      "DESCRIPCION": "Documento de  transporte",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": false
                    },
                      {
                      "DESCRIPCION": "Factura comercial",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": true
                    },
                      {
                      "DESCRIPCION": "Lista de empaque",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": false
                    },
                      {
                      "DESCRIPCION": "Certificado origen",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": false
                    },
                      {
                      "DESCRIPCION": "Certificado de analisis",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": false
                    },
                      {
                      "DESCRIPCION": "Carta de certificacion  de credito directo",
                      "ESTADO": true,
                      "OBSERVACION": "",
                      "INDICADOR_FINALIZADO": false
                    },
                  ],
                  "FACTURACION": [
                    {"PEDIDO":"20000001",  "FACTURA":"900001",  "FECHA_EMISION":"25/07/2023",  "FECHA_VENCIMIENTO":"25/08/2023",  "MONEDA":"USD",  "PRECIO_TOTAL":"16950",  "GASTOS_EMBARQUE":"150",  "FLETE":"180",  "SEGURO":"0",  "TOTAL":"1780",  "NRO_GUIAS":"09-T001-123"},
                    {"PEDIDO":"20000002",  "FACTURA":"900002",  "FECHA_EMISION":"25/07/2023",  "FECHA_VENCIMIENTO":"25/08/2023",  "MONEDA":"USD",  "PRECIO_TOTAL":"5780",  "GASTOS_EMBARQUE":"100",  "FLETE":"120",  "SEGURO":"50",  "TOTAL":"6050",  "NRO_GUIAS":"09-T001-125"}
                  ],
                  "DETALLE":[
                    { "PEDIDO":"20000001",  "ITEM":"10",  "NRO_SERIE_DUA":"",  "CODIGO_MATERIAL":"40000001",  "DESCRIPCION_MATERIAL":"PRODUCTO A",  "CANTIDAD_ORDENADA":"1500",  "PRESENTACION":"UN",  "PRECIO_UNITARIO":"5.8",  "TOTAL":"8700"},
                    { "PEDIDO":"20000001",  "ITEM":"20",  "NRO_SERIE_DUA":"",  "CODIGO_MATERIAL":"40000002",  "DESCRIPCION_MATERIAL":"PRODUCTO B",  "CANTIDAD_ORDENADA":"500",  "PRESENTACION":"UN",  "PRECIO_UNITARIO":"3.6",  "TOTAL":"1800"},
                  ],
                  "IMPORTACION_LIST":
                  [
                    {
                      "OPERACION": "E-00001",
                      "ORDEN_COMPRA": "420000123",
                      "CONTRATO_MARCO": "460000123",
                      "OBSERVACION": "",
                      "FECHA_EMISION_OC": "1/07/2023",
                      "FECHA_TRANS_OC": "29/07/2023",
                      "CODIGO_PROVEEDOR": "100001",
                      "RAZON_SOCIAL_PROVEEDOR": "PECUARIA HONDURENA",
                      "CONDICION_PAGO": "CIF",
                      "TOTAL_PEDIDO": "71303.5",
                      "ESTADO": "PLANEADO"
                    },
                    {
                      "OPERACION": "E-00001",
                      "ORDEN_COMPRA": "420000124",
                      "CONTRATO_MARCO": "460000123",
                      "OBSERVACION": "",
                      "FECHA_EMISION_OC": "1/07/2023",
                      "FECHA_TRANS_OC": "29/07/2023",
                      "CODIGO_PROVEEDOR": "100001",
                      "RAZON_SOCIAL_PROVEEDOR": "PECUARIA HONDURENA",
                      "CONDICION_PAGO": "CIF",
                      "TOTAL_PEDIDO": "70151.2",
                      "ESTADO": "PLANEADO"
                    }
                  
                  ],
                  "IMPORTACION_LIST_ORDEN":[
                    {
                      "OPERACION": "I-00001",
                      "FECHA_TRANS_OC": "29/07/2023",
                      "CODIGO_PROVEEDOR": "10000001",
                      "RAZON_SOCIAL_PROVEEDOR": "PECUARIA HONDURENA",
                      "MODALIDAD_EMBARQUE": "MARITIMO",
                      "ESTADO": ""
                    },
                    {
                      "OPERACION": "I-00002",
                      "FECHA_TRANS_OC": "29/07/2023",
                      "CODIGO_PROVEEDOR": "10000002",
                      "RAZON_SOCIAL_PROVEEDOR": "ESCALANTE SANCHEZ",
                      "MODALIDAD_EMBARQUE": "MARITIMO",
                      "ESTADO": ""
                    }
                  ],
                  "DETAIL_IMPORT_PEDIDO":[
                    {
                      "EMBARQUE": "18000001",
                      "ENTREGA_ENTRANTE": "460000123",
                      "POSICION": "10",
                      "CODIGO_ARTICULO": "4E+09",
                      "DESCRIPCION_ARTICULO": "PRODUCTO",
                      "CANTIDAD_ORDENADA": "1500",
                      "PRESENTACION": "UN",
                      "CENTRO": "1101",
                      "ALMACEN": "1010",
                      "PRECIO_UNITARIO": "475.75",
                      "FECHA_EMBARQUE_REQUERIDA": "10/05/2023",
                      "FECHA_INGRESO_REQUERIDA": "10/06/2023",
                      "PARTIDA_ARANCELARIA": "PA-89511",
                      "CANTIDAD_EMBARCADA": "",
                      "CANTIDAD_RECIBIDA": "",
                      "FECHA_CRM": "",
                      "FECHA_ENTREGA_ENTRANTE": "",
                      "IMOP": "",
                      "CENTRO_RECEPCION": "",
                      "ALMACEN_RECEPCION": "",
                    },
                    {
                      "EMBARQUE": "18000001",
                      "ENTREGA_ENTRANTE": "460000123",
                      "POSICION": "10",
                      "CODIGO_ARTICULO": "4E+09",
                      "DESCRIPCION_ARTICULO": "PRODUCTO",
                      "CANTIDAD_ORDENADA": "500",
                      "PRESENTACION": "UN",
                      "CENTRO": "1101",
                      "ALMACEN": "1010",
                      "PRECIO_UNITARIO": "113.65",
                      "FECHA_EMBARQUE_REQUERIDA": "10/05/2023",
                      "FECHA_INGRESO_REQUERIDA": "10/06/2023",
                      "PARTIDA_ARANCELARIA": "PA-85521",
                      "CANTIDAD_EMBARCADA": "",
                      "CANTIDAD_RECIBIDA": "",
                      "FECHA_CRM": "",
                      "FECHA_ENTREGA_ENTRANTE": "",
                      "IMOP": "",
                      "CENTRO_RECEPCION": "",
                      "ALMACEN_RECEPCION": "",
                    } 
                  ],
                  "LIST_DOCUMENTACION_IMPORTACION":[
                    { "DESCRIPCION": "Factura comercial", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""},
                    { "DESCRIPCION": "Documento de transporte", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""},
                    { "DESCRIPCION": "Lista de empaque", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""},
                    { "DESCRIPCION": "Certificado origen", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""},
                    { "DESCRIPCION": "Certificado de análisis", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""},
                    { "DESCRIPCION": "Carta de certificación de credito directo", "ESTADO": "", "OBSERVACION": "", "INDICADOR_FINALIZADO": ""}
                  ]
                  
                  
                  
                      
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam"); 
            }
        });
    }
);