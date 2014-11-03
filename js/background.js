define('background', ['materials'],function (materials){

	'use strict';

	return {
		Background: function (game) {

			this.game = game;
			this.grassTile = null;

			this.preload = function () {
	    		this.game.load.image('background_tile', 'assets/background/background.png');
	    		this.game.load.image('background_grass', 'assets/background/grass.png');
			};

			this.create = function (wWidth, wHeight, collisionGroups) {
				game.add.tileSprite(0, 0, wWidth, wHeight, 'background_tile');

				this.grassTile = game.add.tileSprite(wWidth/2, wHeight - 65/2, wWidth, 65, 'background_grass' );
				game.physics.p2.enable(this.grassTile);

				this.grassTile.body.setCollisionGroup(collisionGroups.background);
    			this.grassTile.body.static = true;
				this.grassTile.body.mass = 1000;
				this.grassTile.body.fixedRotation = true;
				this.grassTile.body.static_forever = true;
		        this.grassTile.body.collides(
		        		[collisionGroups.contact, collisionGroups.skills, collisionGroups.car, 
		        		collisionGroups.history, collisionGroups.background, collisionGroups.doge,
		        		collisionGroups.wheel]);

				game.physics.p2.setMaterial(materials.worldMaterial, [this.grassTile.body]);

			};

		}
	};

});