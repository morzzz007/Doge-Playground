define(["positions"], function (positions) {

	return {
		ImageStash: function (game, sub_domain) {
			this.game 				= game;
			this.sub_domain 		= sub_domain;
			this.image_names_array 	= _.keys(positions[sub_domain]);
			this.default_directory	= "./assets/";
			this.group;
			this.elements = [];

			this.load = function () {
				_.each(this.image_names_array, function (image) {
					this.game.load.image(this.sub_domain + '_' + image, this.default_directory + this.sub_domain +  '/' + image + '.png');
				}, this);
			};

			function blockHit (body, shapeA, shapeB, equation) {
				if (body !== null) {
					body.data.mass = 1;
				}
			}

			this.create = function (collisionGroups) {
				this.group = this.game.add.group();

				_.each(this.image_names_array, function (image) {

					if (!_.isUndefined(positions[sub_domain][image])) {
						var properties = positions[sub_domain][image];
						var element = this.group.create(properties.x, properties.y, this.sub_domain + '_' + image);
						
						// set left coordinate relative to new anchor

						if (!properties.physics_disabled) {
							element.x = element.x + (element.width/2);
							element.y = element.y + (element.height/2);

							this.game.physics.p2.enable(element);

							if (sub_domain == "car" && image == "car") {
								element.body.clearShapes();
								element.body.loadPolygon('physicsData', 'car');
							}

							if (properties.circle) {
								element.body.setCircle(49/2);
							}

							if (properties.motionstate == 'static') {
								element.body.data.mass = 0;

								element.body.onBeginContact.add(blockHit, this);
							}

							if (!_.isUndefined(properties.fixedRotation)) {
								element.body.fixedRotation = properties.fixedRotation;
							}

							if (!_.isUndefined(properties.collideWorldBounds)) {
								element.body.collideWorldBounds = properties.collideWorldBounds;
							}

							if (!_.isUndefined(properties.collisionGroup)) {
								element.body.setCollisionGroup(collisionGroups[properties.collisionGroup]);
							}

							if (!_.isUndefined(properties.scene)) {
								element.body.static = true;
								element.body.mass = 1000;
								element.body.fixedRotation = true;
								element.body.static_forever = true;
							}

							if (!_.isUndefined(properties.collides)) {

								var tempGroups = [];

								// collides with 'background objects by default'
								tempGroups.push(collisionGroups['background']);

								_.each(properties.collides, function (group) {
									tempGroups.push(collisionGroups[group]);
								});

								element.body.collides(tempGroups);
							}
							
						}
						
						this.elements.push(element);

					}

				}, this);
			}
		}
	}
});