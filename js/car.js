define('car', ['imageStash', 'buttons'],function (imgStash, buttons){

	'use strict';

	return {
		Car: function (game) {

			this.game = game;
			this.car = new imgStash.ImageStash(game, 'car');
			this.wheelMaterial = {};

			this.rearWheelConstraint = {};
			this.frontWheelConstraint = {};
			this.dogeHeadConstraint = {};

			this.preload = function () {
				this.game.load.physics('physicsData', 'assets/car/car.json'); 
				this.car.load();
			};

			this.create = function (collisionGroups) {
				this.wheelMaterial = this.game.physics.p2.createMaterial('wheelMaterial');
				this.car.create(collisionGroups);
			};

			this.createContactMaterialWithWheels = function (anotherMaterial, friction) {
    			var contactMaterial = game.physics.p2.createContactMaterial(this.wheelMaterial, anotherMaterial);
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

			    /* DOGE CAR HEAD */
				this.dogeHeadConstraint = this.game.physics.p2.createPrismaticConstraint(this.car.elements[1].body, this.car.elements[0].body, true, [-20, -40], [0, 0], [10, 40]);
			    this.dogeHeadConstraint.upperLimitEnabled = true;
			    this.dogeHeadConstraint.upperLimit = this.game.physics.p2.pxm(0.2);
			    this.dogeHeadConstraint.lowerLimitEnabled = true;
			    this.dogeHeadConstraint.lowerLimit = this.game.physics.p2.pxm(-0.4);	 
			};

			this.update = function () {
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

			this.cameraFollow = function (game) {

			};

		}
	};

});