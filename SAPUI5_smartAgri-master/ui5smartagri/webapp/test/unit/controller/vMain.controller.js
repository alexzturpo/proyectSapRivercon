/*global QUnit*/

sap.ui.define([
	"sm/ui5smartagri/controller/vMain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("vMain Controller");

	QUnit.test("I should test the vMain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
