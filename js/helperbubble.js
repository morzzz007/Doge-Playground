'use strict';

define('helperbubble', ["gamestate"], function (gamestate) {

	return {

		game: {},
		bubble: {},
		disabled: false,

		setup: function (game) {
			this.game = game;
		},

		preload: function () {
			this.game.load.spritesheet('bubble_enter_car', 'assets/bubbles/entercar.png', 348, 58, 2);
		},

		create: function () {
			this.bubble = this.game.add.sprite(600, 0, 'bubble_enter_car');
			this.bubble.animations.add('blink', [0,1], 2, true);
			this.bubble.animations.play('blink');
			this.bubble.exists = false;
		},

		show: function () {
			this.bubble.exists = true;
			this.shown_at_least_once = true;
		},

		hide: function () {
			this.bubble.exists = false;
			this.hiddan_at_least_once = true;
		},

		updatePosition: function (newX, newY) {
			// FIXME: don't calculate anything when not displayed on screen
			var trCoords = this.transformCoordinates(newX, newY);
			this.bubble.x = trCoords.x;
			this.bubble.y = trCoords.y;
		},

		transformCoordinates: function (x,y) {
			return { x: x - 250, y: y - 90 };
		},

		update: function () {

			if (!gamestate.doge_is_in_car && !this.disabled) {
				var result = gamestate.canDogeEnterTheCar();
				if (result) {
					this.show();
				}
				else {
					this.hide();
				}
			}

			if (gamestate.doge_is_in_car) {
				this.disabled = true;
				this.hide();
			}

		}
	};

});