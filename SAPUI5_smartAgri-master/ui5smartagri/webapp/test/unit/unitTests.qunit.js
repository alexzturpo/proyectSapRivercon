/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sm/ui5smartagri/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
