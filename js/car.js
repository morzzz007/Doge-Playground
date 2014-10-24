define('car', ['imagestash', 'buttons', 'gamestate'],function (imgStash, buttons, gamestate){

	'use strict';

	return {
		Car: function (game) {

			this.game = game;
			this.car = new imgStash.ImageStash(game, 'car');
			this.wheelMaterial = {};

			this.rearWheelConstraint = {};
			this.frontWheelConstraint = {};
			this.dogeHeadConstraint = {};

			this.dogeIsInCar = false;

			this.chassis = {};
			this.dogeHead = {};

			this.preload = function () {
				this.game.load.physics('physicsData', 'assets/car/car.json'); 
				this.car.load();
			};

			this.create = function (collisionGroups) {
				this.car.create(collisionGroups);
				this.chassis = this.car.elements[1].body;
				this.dogeHead = this.car.elements[0];
				this.wheelMaterial = this.game.physics.p2.createMaterial('wheelMaterial');
				this.game.physics.p2.setMaterial(this.wheelMaterial, [this.car.elements[1].body, this.car.elements[2].body]);
				this.dogeHead.kill();
			};

			this.createContactMaterialWithWheels = function (anotherMaterial, friction) {
    			var contactMaterial = this.game.physics.p2.createContactMaterial(this.wheelMaterial, anotherMaterial);
    			contactMaterial.friction = friction;
			};

			this.createConstraints = function () {
		    	/* CAR WHEELS */
				this.rearWheelConstraint = this.game.physics.p2.createPrismaticConstraint(this.car.elements[1].body, this.car.elements[2].body, false, [-68, 40], [0, 0], [10, 30]);
			    this.rearWheelConstraint.upperLimitEnabled = true;
			    this.rearWheelConstraint.upperLimit = this.game.physics.p2.pxm(0.2);
			    this.rearWheelConstraint.lowerLimitEnabled = true;
			    this.rearWheelConstraint.lowerLimit = this.game.physics.p2.pxm(-0.4);

				this.frontWheelConstraint = this.game.physics.p2.createPrismaticConstraint(this.car.elements[1].body, this.car.elements[3].body, false, [72, 40], [0, 0], [10, 30]);
			    this.frontWheelConstraint.upperLimitEnabled = true;
			    this.frontWheelConstraint.upperLimit = this.game.physics.p2.pxm(0.2);
			    this.frontWheelConstraint.lowerLimitEnabled = true;
			    this.frontWheelConstraint.lowerLimit = this.game.physics.p2.pxm(-0.4);
 			};

			this.toggleHeadConstraint = function (state) {
				if (state) {
					this.dogeHeadConstraint = this.game.physics.p2.createPrismaticConstraint(this.car.elements[1].body, this.car.elements[0].body, true, [-20, -40], [0, 0], [10, 40]);
				    this.dogeHeadConstraint.upperLimitEnabled = true;
				    this.dogeHeadConstraint.upperLimit = this.game.physics.p2.pxm(0.2);
				    this.dogeHeadConstraint.lowerLimitEnabled = true;
				    this.dogeHeadConstraint.lowerLimit = this.game.physics.p2.pxm(-0.4);	
				} else {
					this.game.physics.p2.removeConstraint(this.dogeHeadConstraint);
				}
			};

			this.update = function () {

				gamestate.updateCarCoordinates(this.car.elements[1].body.x, this.car.elements[1].body.y);

			    if(buttons.enterButton.isDown && buttons.enterButton.repeats === 0) {
			    	if (!this.dogeIsInCar && gamestate.canDogeEnterTheCar()) {
			    		this.enterCar();
			    	} else {
			    		this.exitCar();
			    	}
			    }
				
				if (!this.dogeIsInCar) return;
				
			   	if (buttons.cursors.left.isDown)
			    {
			    	this.car.elements[2].body.rotateLeft(500);
		    		this.car.elements[3].body.rotateLeft(500);
			    }
			    else if (buttons.cursors.right.isDown)
			    {
					this.car.elements[2].body.rotateRight(500);
		    		this.car.elements[3].body.rotateRight(500);
			    }

			};

			this.cameraFollow = function () {
				this.game.camera.follow(this.chassis);
			};

			this.enterCar = function () {
				this.dogeIsInCar = true;
				this.dogeHead.reset(this.car.elements[1].body.x - 50, this.car.elements[1].body.y - 50);
				this.cameraFollow();
				this.toggleHeadConstraint(this.dogeIsInCar);
			};

			this.exitCar = function () {
				this.dogeIsInCar = false;
				this.toggleHeadConstraint(this.dogeIsInCar);
				this.dogeHead.kill();
			};

		}
	};

});