define(function () {

	'use strict';

	return {
		Background: function (game) {

			this.game = game;

			this.preload = function () {
	    		this.game.load.image('background_tile', 'assets/background.png');
			};

			this.create = function (wWidth, wHeight) {
				game.add.tileSprite(0, 0, wWidth, wHeight, 'background_tile');
			};

		}
	};

});