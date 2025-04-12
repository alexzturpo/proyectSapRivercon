/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "srm/aplication/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("srm.aplication.Component", {
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

                    "listFactura":[{"EM_RUC":"001"}],
                    "listItemFacturas":[{"POS_FACTURA":"name"}],
                    "tbDetailHC":[
                      {
                        "documento": "Factura001",
                        "cliente": "ClienteA",
                        "tipoCambio": 3.5,
                        "montoSoles": 500.75,
                        "montoUSD": 143.07,
                        "tipo": "Contado",
                        "pagoSoles": 500.75,
                        "pagoUSD": 143.07,
                        "vueltoSoles": 0,
                        "deposito": "CuentaA",
                        "banco": "BancoX",
                        "fechaDeposito": "2023-09-02",
                        "nroOperacion": "Op001"
                      },
                      {
                        "documento": "Factura002",
                        "cliente": "ClienteB",
                        "tipoCambio": 3.6,
                        "montoSoles": 600.50,
                        "montoUSD": 166.80,
                        "tipo": "Crédito",
                        "pagoSoles": 600.50,
                        "pagoUSD": 166.80,
                        "vueltoSoles": 0,
                        "deposito": "CuentaB",
                        "banco": "BancoY",
                        "fechaDeposito": "2023-09-03",
                        "nroOperacion": "Op002"
                      },
                      {
                        "documento": "Factura003",
                        "cliente": "ClienteC",
                        "tipoCambio": 3.7,
                        "montoSoles": 700.25,
                        "montoUSD": 189.25,
                        "tipo": "Contado",
                        "pagoSoles": 700.25,
                        "pagoUSD": 189.25,
                        "vueltoSoles": 0,
                        "deposito": "CuentaC",
                        "banco": "BancoZ",
                        "fechaDeposito": "2023-09-04",
                        "nroOperacion": "Op003"
                      }
                    ],
                    "tbDetailHCTotal":[{
                      "documento": "",
                      "cliente": "",
                      "tipoCambio": "",
                      "montoSoles": 1801.50,
                      "montoUSD": 499.12,
                      "tipo": "",
                      "pagoSoles": 1801.50,
                      "pagoUSD": 499.12,
                      "vueltoSoles": "",
                      "deposito": "",
                      "banco": "",
                      "fechaDeposito": "",
                      "nroOperacion": ""
                    }],
                    "tbDetailHojaCobranza": [
                        {
                          "descripcion": "Total Ingresos por efectivo por monto de facturas",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Salidas por vuelto real",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total diferencia por conversión al T/C",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Importe por Redondeos",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Efectivo líquido a entregar a Caja",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total ingresos por abono por Operador",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Ingresos + Tarjetas",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total ingresos en cheques / Certificados",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Ingresos en Abonos Bancos / Depósitos",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Recaudación en Caja",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total Ingresos por canje de saldos a favor (0/C)",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total recaudado equivalente en soles o dólares",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total depósitos pendientes de aplicación",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total cheques pendientes de aplicación",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total redondeos a favor de clientes",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Neto aplicar Documentos equivalentes en soles o dólares",
                          "soles": "",
                          "dolares": ""
                        },
                        {
                          "descripcion": "Total recaudado por percepción",
                          "soles": "",
                          "dolares": ""
                        }
                    ],
                    "tbVentaProductos":[
                      {
                        "codigoProducto": "001",
                        "descripcionProducto": "Producto A",
                        "lote": "Lote123",
                        "fechaVencimiento": "2023-12-31",
                        "cantidad": 10,
                        "precioUnitario": 20.5,
                        "descuentoPorcentaje": 5,
                        "valorUnitario": 19.475
                      },
                      {
                        "codigoProducto": "002",
                        "descripcionProducto": "Producto B",
                        "lote": "Lote456",
                        "fechaVencimiento": "2024-06-30",
                        "cantidad": 5,
                        "precioUnitario": 15.75,
                        "descuentoPorcentaje": 3,
                        "valorUnitario": 15.2925
                      }
                    ],
                    "tbTarjetaCredito":[
                      {"operador":"IZI PAY","numPost":"","importe":"","numOperador":""},
                      {"operador":"NIUBIZ","numPost":"","importe":"","numOperador":""},
                      {"operador":"IZI PAY","numPost":"","importe":"","numOperador":""},
                    ],
                    "tbDgTarjetaCredito":[
                      {"operador":"IZI PAY","oficina":"","numPost":"","cuentaTransito":""}, 
                      {"operador":"NIUBIZ","oficina":"","numPost":"","cuentaTransito":""}, 
                    ],
                    "tbDepositos":[
                      {"banco":"BCP","importe":"","operacion":"","fechaOperacion":""}, 
                    ],
                    "tbDgDepositos":[
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                      {"numPost":"","fecha":"","importe":"","numOperacion":""}, 
                    ],
                    "tbNotaCreditos":[
                      {"noteCreadito":"Nota 01","importe":"","moneda":""}, 
                    ],
                    "tbHojaCobranza":[
                      {
                        "nroHojaCobranza": "HC001",
                        "fechaAperturaCaja": "2023-09-01",
                        "fechaCierreCaja": "2023-09-30",
                        "oficinaVentas": "Oficina A",
                        "condicionPago": "Contado",
                        "totalSoles": 1500.75,
                        "totalDolares": 500.25,
                        "status": "Cerrada",
                        "usuarioCreador": "Usuario1"
                      },
                      {
                        "nroHojaCobranza": "HC002",
                        "fechaAperturaCaja": "2023-09-05",
                        "fechaCierreCaja": "2023-09-30",
                        "oficinaVentas": "Oficina B",
                        "condicionPago": "Crédito",
                        "totalSoles": 2200.50,
                        "totalDolares": 600.75,
                        "status": "Cerrada",
                        "usuarioCreador": "Usuario2"
                      },
                      {
                        "nroHojaCobranza": "HC003",
                        "fechaAperturaCaja": "2023-09-10",
                        "fechaCierreCaja": "2023-09-30",
                        "oficinaVentas": "Oficina C",
                        "condicionPago": "Contado",
                        "totalSoles": 1800.25,
                        "totalDolares": 550.00,
                        "status": "Abierta",
                        "usuarioCreador": "Usuario3"
                      }
                    ],
                };
                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.setModel(oModel);
                this.setModel(oModel, "myParam"); 
            }
        });
    }
);