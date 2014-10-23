'use strict';

define({

	cursors: {},
	jumpButton: {},
	enterButton: {},
	setupButtons: function (game) {
		this.cursors = game.input.keyboard.createCursorKeys();
	    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    this.enterButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
	}

});