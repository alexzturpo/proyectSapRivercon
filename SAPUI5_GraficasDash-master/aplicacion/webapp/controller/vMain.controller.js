sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("gd.aplicacion.controller.vMain", {
            onInit: function () {

            },
            onAfterRendering : function() { 
                var ctx = document.getElementById("myChart");
                var myChart = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                      labels: ["Venta fuerte","Vender","Neutral","Comprar","Compra fuerte"],
                      datasets: [
                        {
                          label: ["hola"],
                          data: [100,100,100,100,100],
                          backgroundColor: [
                            "rgba(245, 117, 5, 0.7)",
                            "rgba(255, 0, 0, 0.7)",
                            "rgba(255, 232, 0, 0.7)",
                            "rgba(219, 255, 143, 0.7)",
                            "rgba(0, 174, 31, 0.7)",
                          ],
                          borderColor: [
                            "rgba(245, 117, 5,1)",
                            "rgba(255, 0, 0, 1)",
                            "rgba(255, 232, 0,1)",
                            "rgba(219, 255, 143,1)",
                            "rgba(0, 174, 31, 1)"
                          ],
                          borderWidth: 1
                        }
                      ]
                    },
                    options: {
                      maintainAspectRatio: false,
                      circumference: 180,
                      rotation: 270, 
                  
                      onClick(...args) {
                        console.log(args);
                      }
                    } 
                  });

                var ctx = document.getElementById("myChart2");
                var myChart = new Chart(ctx, {
                    type: "doughnut",
                    data: {
                      labels: ["Venta fuerte","Vender","Neutral","Comprar","Compra fuerte"],
                      datasets: [
                        {
                          label: ["hola"],
                          data: [100,100,100,100,100],
                          backgroundColor: [
                            "rgba(245, 117, 5, 0.7)",
                            "rgba(255, 0, 0, 0.7)",
                            "rgba(255, 232, 0, 0.7)",
                            "rgba(219, 255, 143, 0.7)",
                            "rgba(0, 174, 31, 0.7)",
                          ],
                          borderColor: [
                            "rgba(245, 117, 5,1)",
                            "rgba(255, 0, 0, 1)",
                            "rgba(255, 232, 0,1)",
                            "rgba(219, 255, 143,1)",
                            "rgba(0, 174, 31, 1)"
                          ],
                          borderWidth: 1
                        }
                      ]
                    },
                    options: {
                      maintainAspectRatio: false,
                      circumference: 180,
                      rotation: 270, 
                  
                      onClick(...args) {
                        console.log(args);
                      }
                    } 
                  });
            }
        });
    });
