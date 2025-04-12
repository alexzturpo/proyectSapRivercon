sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("adp.aplication.controller.vProveedor", {
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        onInit: function () {

        },
        //NAVEGAR
        onPageBack: function () { 
            this.getRouter().getTargets().display("TargetvMain");
        },
        navUpdateData: function () { 
            console.log("updateData")
            this.getSplitContObj().to(this.createId("detail"));
        },
        //FUNCIONES GENERALES 
        getSplitContObj: function () {
			var result = this.byId("SplitContDemo");
			if (!result) {
				Log.error("SplitApp object can't be found");
			}
			return result;
		},
        onPressDetailBack: function () {
			this.getSplitContObj().backDetail();
		},
    });
});
