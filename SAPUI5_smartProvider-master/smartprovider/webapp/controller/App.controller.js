sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("appsp.smartprovider.controller.controller.App", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit() {
        },
        onVmain: function () {
            this.getRouter().getTargets().display("TargetvMain");
        },
        onVproveedores: function () {
            this.getRouter().getTargets().display("Target_vProveedorRFQ");
        },
        onComparar: function () {
            this.getRouter().getTargets().display("Target_vCompararCotizacion");
        },
        onAdministrarC: function () {
            this.getRouter().getTargets().display("Target_vAdministrarC");
        },
      });
    }
  );
  