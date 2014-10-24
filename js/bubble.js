'use strict';

define({

	game: {},
	bubble: {},
	shown: false,

	setup: function (game) {
		this.game = game;
	},

	preload: function () {
		this.game.load.spritesheet('bubble_enter_car', 'assets/bubbles/entercar.png', 348, 58, 2);
	},

	show: function () {
		this.bubble = this.game.add.sprite(600, 0, 'bubble_enter_car');
		this.bubble.animations.add('blink', [0,1], 2, true);
		this.bubble.animations.play('blink');
	},

	updatePosition: function (newX, newY) {
		var trCoords = this.transformCoordinates(newX, newY);
		this.bubble.x = trCoords.x;
		this.bubble.y = trCoords.y;
	},

	transformCoordinates: function (x,y) {
		return { x: x - 250, y: y - 90 };
	}

});