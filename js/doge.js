define(['buttons', 'helperbubble', 'gamestate'], function (buttons, helperbubble, gamestate){

	'use strict';

	return {
		Doge: function (game) {

			this.game = game;
			this.doge = {};
			this.x_velocity = 300;
			this.facing = 'right';
			this.state = 'idle';
			this.is_in_car = false;

			function blockHit (body, shapeA, shapeB, equation) { 		// body, shapeA, shapeB, equation
				if (body !== null && _.isUndefined(body.static_forever)) {
					body.data.mass = 1;
				}
			}

			function checkIfCanJump(game, doge) {

			    var yAxis = p2.vec2.fromValues(0, 1);
			    var result = false;

			    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
			    {
			        var c = game.physics.p2.world.narrowphase.contactEquations[i];

			        if (c.bodyA === doge.body.data || c.bodyB === doge.body.data)
			        {
			            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
			            if (c.bodyA === doge.body.data) d *= -1;
			            if (d > 0.5) result = true;
			        }
			    }
			    
			    return result;

			}

			this.preload = function () {
				this.game.load.spritesheet('doge', 'assets/doge_run.png', 80, 76, 28);
			};

			this.create = function (collisionGroups) {
				this.doge = this.game.add.sprite(500, 0, 'doge');
		
				this.doge.animations.add('right', [1,2,3,4,5,6,7,8], 15, true);
				this.doge.animations.add('left', [11,12,13,14,15,16,17,18], 15, true);

				this.doge.animations.add('stopped_right', [0], 15, true);
				this.doge.animations.add('stopped_left', [19], 15, true);

				this.doge.animations.add('fly_up_right', [20], 15, true);
				this.doge.animations.add('fly_down_right', [21], 15, true);
				this.doge.animations.add('fly_up_left', [27], 15, true);
				this.doge.animations.add('fly_down_left', [26], 15, true);

				game.physics.p2.enable([this.doge]);

				this.doge.body.fixedRotation = true;
				this.doge.body.collideWorldBounds = true;
				this.doge.body.onBeginContact.add(blockHit);
		        this.doge.body.setCollisionGroup(collisionGroups.doge);
		        this.doge.body.collides([collisionGroups.contact, collisionGroups.skills, collisionGroups.car, collisionGroups.history, collisionGroups.background]);
			};

			this.update = function () {

				gamestate.updateDogeCoordinates(this.doge.body.x, this.doge.body.y);

			    if(buttons.enterButton.isDown && buttons.enterButton.repeats === 0) {
			    	if (this.is_in_car) {
			    		gamestate.dogeExitedTheCar();
			    		this.exitCar();
			    	} else {
			    		if (gamestate.canDogeEnterTheCar()) {
				    		gamestate.dogeEnteredTheCar();
				    		this.enterCar();
			    		}
			    	}
			    }

			    // ---
			    // Only calculate the following when doge is in action
			    if (this.is_in_car) return;
			    // ---

			    helperbubble.updatePosition(this.doge.body.x, this.doge.body.y);

				this.doge.body.velocity.x = 0;
				var floorResult = checkIfCanJump(game, this.doge);

			   	if (buttons.cursors.left.isDown)
			    {
			    	if (!this.is_in_car) {
				        this.doge.body.velocity.x = this.x_velocity * -1;
				        this.facing = 'left';
				        this.state = 'moving';
				    }
			    }
			    else if (buttons.cursors.right.isDown)
			    {
			    	if (!this.is_in_car) {
			    		this.doge.body.velocity.x = this.x_velocity;
			        	this.facing = 'right';
			        	this.state = 'moving';
			    	}
			    }
			    else
			    {
			        this.state = 'idle';
			    }

			    if (this.facing == 'left')
			    {
			    	if (floorResult) {
			    		if (this.state == 'moving') {
			    			this.doge.animations.play('left');
			    		} else {
			    			this.doge.animations.play('stopped_left');
			    		}

			    	} else {
			    		if (this.doge.body.velocity.y < 0) {
							this.doge.animations.play('fly_up_left');
			    		} else {
							this.doge.animations.play('fly_down_left');
			    		}
			    	}
			   	}

			    if (this.facing == 'right')
			    {
			    	if (floorResult) {
			    		if (this.state == 'moving') {
			    			this.doge.animations.play('right');
			    		} else {
			    			this.doge.animations.play('stopped_right');
			    		}
			    	} else {
			    		if (this.doge.body.velocity.y < 0) {
							this.doge.animations.play('fly_up_right');
			    		} else {
							this.doge.animations.play('fly_down_right');
			    		}
			    	}
			   	}


			    if ( (buttons.cursors.up.isDown) && floorResult)
			    {
			        this.doge.body.velocity.y = -400;
			    }

			};

			this.cameraFollow = function () {
				this.game.camera.follow(this.doge);
			};

			this.enterCar = function () {
				this.is_in_car = true;
				this.doge.kill();
			};

			this.exitCar = function () {
				this.is_in_car = false;
				this.doge.reset(gamestate.car_coordinates.x- 40, gamestate.car_coordinates.y - 60);
				this.cameraFollow();
			};

		}
	};

});