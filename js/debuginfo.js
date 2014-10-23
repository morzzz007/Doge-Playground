define(function () {

	'use strict';

	var version = "0.0.0.5.1";
	var lastUpdate = "2014.10.23";

	return function (game) {
		game.add.text(500, 10, "Doge Playground\nDev version: " + version + " @ " + lastUpdate, { font: "12px Arial", fill: "#fff" });
	};

});