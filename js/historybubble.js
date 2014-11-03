'use strict';

define('historybubble', ["gamestate"], function (gamestate) {

	return {

		game: {},
		years: [2005,2007,2009,2011,2013],
		bubbles: [],

		setup: function (game) {
			this.game = game;
		},

		preload: function () {
			_.each(this.years, function (year) {
				console.log('bubble_' + year);
				this.game.load.image('bubble_' + year, 'assets/history/' + year + '.png');
			}, this);
		},

		create: function () {
			_.each(this.years, function (year) {
				var tempBubble = this.game.add.sprite(0,0, 'bubble_' + year);
				tempBubble.exists = false;
				this.bubbles.push(tempBubble);
			}, this);
		},

		show: function (index) {
			this.bubbles[index].exists = true;
		},

		hide: function (index) {
			this.bubbles[index].exists = false;
		},

		updatePosition: function (newX, newY, index) {
			// FIXME: don't calculate anything when not displayed on screen
			var trCoords = this.transformCoordinates(newX, newY);
			this.bubbles[index].x = trCoords.x;
			this.bubbles[index].y = trCoords.y;
		},

		transformCoordinates: function (x,y) {
			return { x: x - 250, y: y - 135 };
		},

		update: function () {

			_.each(this.bubbles, function (bubble) {
				bubble.exists = false;
			}, this);

			var result = gamestate.indexOfSignToDisplay();
			if (!_.isUndefined(result)) {
				this.updatePosition(gamestate.doge_coordinates.x, gamestate.doge_coordinates.y, result);
				this.bubbles[result].exists = true;
			};

		}
	};

});