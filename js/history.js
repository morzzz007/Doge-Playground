define('history', ['imagestash', 'gamestate'],function (imgStash, gamestate){

	'use strict';

	return {
		History: function (game) {

			this.game = game;
			this.assets = new imgStash.ImageStash(game, 'history');

			this.preload = function () {
				this.assets.load();
			};

			this.create = function (collisionGroups) {
				this.assets.create(collisionGroups);
			};

			this.update = function(){
			}
		}
	};

});