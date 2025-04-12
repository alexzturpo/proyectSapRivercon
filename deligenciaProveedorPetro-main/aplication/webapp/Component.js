/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "adp/aplication/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("adp.aplication.Component", {
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
                    "dataTest":[
                        {"cadena": "Texto de ejemplo","numero": 42,"booleano": true,"fecha": "22/08/2023" },
                        {"cadena": "Texto de ejemplo","numero": 23,"booleano": false,"fecha": "22/08/2023" },
                    ],
                    "dataTestVerificacion":[
                        {"cadena": "La información contenida en este formulario se condice con la información verificada","booleano": true},
                        {"cadena": "Si la información contenida en este formulario no se condice con la información verificada y no puede ser subsanada, se comunicó este hecho a la Oficialía de Cumplimiento","booleano": false},
                        {"cadena": "El proveedor, sus accionistas, socios o asociados, directores o gerentes, incurre(n) en alguna de las causales por las cuales PETROPERÚ no puede relacionarse con él: Si la respuesta es 'SI' por favor detallar la causal","booleano": false},
                        {"cadena": "Si el proveedor incurre en alguna de las causales por las cuales PETROPERÚ no puede relacionarse con él, este hecho fue comunicado al Gerente Departamento y al Oficial de Cumplimiento","booleano": false},
                        {"cadena": "El proveedor, sus accionistas, socios o asociados, directores o gerentes, se encuentra(n) considerado en las “Listas asociadas a LAFT, corrupción y otros delitos (de carácter penal)”: Si la respuesta es 'SI' por favor detallar el delito","booleano": false},
                    ]
                }
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam"); 
            }
        });
    }
);