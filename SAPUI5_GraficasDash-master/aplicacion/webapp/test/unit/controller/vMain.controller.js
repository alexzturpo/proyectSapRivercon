/*global QUnit*/

sap.ui.define([
	"gd/aplicacion/controller/vMain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("vMain Controller");

	QUnit.test("I should test the vMain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
