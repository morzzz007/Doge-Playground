define(["positions"], function (positions) {
	return {
		ImageStash: function (game, sub_domain, image_names_array) {
			this.game 				= game;
			this.sub_domain 		= sub_domain;
			this.image_names_array 	= image_names_array;
			this.default_directory	= './assets/';
			this.group;				

			this.load = function () {
				_.each(this.image_names_array, function (image) {
					this.game.load.image(this.sub_domain + '_' + image, this.default_directory + this.sub_domain +  '/' + image + '.png');
				}, this)
			};

			this.create = function () {
				this.group = this.game.add.group();
				_.each(this.image_names_array, function (image) {
					if (!_.isUndefined(positions[sub_domain][image])) {
						var properties = positions[sub_domain][image]
						var element = this.group.create(properties.x, properties.y, this.sub_domain + '_' + image);
						// set left coordinate relative to new anchor

						if (properties.physics_enabled) {
							element.x = element.x + (element.width/2);
							element.y = element.y + (element.height/2);

							this.game.physics.p2.enable(element);
	        				element.body.motionState = Phaser.Physics.P2.Body.STATIC;
						};

					};
				}, this)
			}
		}
	}
});