'use strict';

define({

	game: null,
	doge_is_in_car: false,
	enter_car_helper_shown: false,
	doge_coordinates: null,
	car_coordinates: null,

	setup: function (game) {
		this.game = game;
	},

	updateDogeCoordinates: function (x,y) {
		this.doge_coordinates = {x:x, y:y};
	},

	updateCarCoordinates: function (x,y) {
		this.car_coordinates = {x:x, y:y};
	},

	getDogeAndCarDistance: function () {
		if (this.doge_coordinates === null || this.car_coordinates === null) return;
		return this.game.math.distance(this.doge_coordinates.x, this.doge_coordinates.y, this.car_coordinates.x, this.car_coordinates.y);
	},

	canDogeEnterTheCar: function () {

		var treshold = 200;
		var result = this.getDogeAndCarDistance();

		if (result && (result < treshold))
			return true;
		return false;

	},

	dogeEnteredTheCar: function () {
		this.enter_car_helper_shown = true;
		this.doge_is_in_car = true;
	},
	dogeExitedTheCar: function () {
		this.doge_is_in_car = false;
	},

});