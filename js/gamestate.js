'use strict';

define({

	game: null,
	doge_is_in_car: false,
	enter_car_helper_shown: false,
	doge_coordinates: null,
	car_coordinates: null,

	sign_coordinates : [
		{ x: 1900 + (1*90 + 0*65) + 50,        y: 290},
		{ x: 1900 + (2*90 + 1*65) + 50,        y: 290},
		{ x: 1900 + (3*90 + 2*65) + 50,        y: 290},
		{ x: 1900 + (4*90 + 3*65) + 50,        y: 290},
		{ x: 1900 + (5*90 + 4*65) + 50,        y: 290},
	],

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

	indexOfSignToDisplay: function () {
		if(this.doge_coordinates.x < 1900) return;
		if(this.doge_coordinates.y > 350) return;

		var nearestSignIndex = -1;
		var nearestSignDistance = 9999;
		_.each(this.sign_coordinates, function (sign,index) {
			var distance = this.game.math.distance(this.doge_coordinates.x, this.doge_coordinates.y, sign.x, sign.y);
			if (distance < nearestSignDistance) {
				nearestSignIndex = index;
				nearestSignDistance = distance;
			}
		}, this);

		if (nearestSignDistance < 100) return nearestSignIndex;
		return undefined;
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