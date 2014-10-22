define(function (require) {

	'use strict';

	var imgStash = require('imagestash');
	var colFactory = require('collisiongroupfactory');

	var game = new Phaser.Game(window.innerWidth, 580, Phaser.AUTO, 'doge-playground',
		{ preload: preload, create: create, update: update, render: render });
	

	var collisionGroups = {};
	var collisionGroupFactory = new colFactory.CollisionGroupFactory(game);
	var aboutMe = new imgStash.ImageStash(game, 'aboutme');
	var skills  = new imgStash.ImageStash(game, 'skills');
	var car 	= new imgStash.ImageStash(game, 'car');

	var wWidth = window.innerWidth;
	var wHeight = 580;

	var doge;
	var doge_props = {
		x_velocity : 300,
		facing: 'right',
		state: 'idle',
		is_in_car: false
	};

	// Buttons
	var cursors;
	var jumpButton;
	var enterButton;

	function preload() {
	    game.load.spritesheet('doge', 'assets/doge_run.png', 80, 76, 28);   
	    game.load.physics('physicsData', 'assets/car/car.json'); 
	    aboutMe.load();
	    skills.load();
	    car.load();
	    collisionGroupFactory.summarizeGroups();
	}

	function create() {
		
		game.world.setBounds(0, 0, 3500, wHeight);

		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 500;
		game.physics.p2.restitution = 0.2;
		
		collisionGroupFactory.createGroups(collisionGroups);
		collisionGroups.doge = game.physics.p2.createCollisionGroup();

		createSky();
		aboutMe.create(collisionGroups);
		skills.create(collisionGroups);
		car.create(collisionGroups);
		createDoge();

		game.physics.p2.updateBoundsCollisionGroup();

		game.physics.p2.enable([doge]);

		doge.body.fixedRotation = true;
		doge.body.collideWorldBounds = true;
		doge.body.onBeginContact.add(blockHit);
        doge.body.setCollisionGroup(collisionGroups.doge);
        doge.body.collides([collisionGroups.contact, collisionGroups.skills, collisionGroups.car]);

		var wheelMaterial	= game.physics.p2.createMaterial('wheelMaterial');
		game.physics.p2.setMaterial(wheelMaterial, [car.elements[1].body, car.elements[2].body]);

		var fontMaterial 	= game.physics.p2.createMaterial('fontMaterial');
		_.each(skills.elements, function (element) {
			game.physics.p2.setMaterial(fontMaterial, [element.body]);
		});
		

    	var worldMaterial = game.physics.p2.createMaterial('worldMaterial');
    	var contactMaterial = game.physics.p2.createContactMaterial(wheelMaterial, worldMaterial);
    	var contactMaterial2 = game.physics.p2.createContactMaterial(wheelMaterial, fontMaterial);
    	contactMaterial.friction = 10;
    	contactMaterial2.friction = 100;

    	game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

		var c1 = game.physics.p2.createPrismaticConstraint(car.elements[0].body, car.elements[1].body, false, [-68, 40], [0, 0], [10, 30]);
	    c1.upperLimitEnabled = true;
	    c1.upperLimit = game.physics.p2.pxm(0.2);
	    c1.lowerLimitEnabled = true;
	    c1.lowerLimit = game.physics.p2.pxm(-0.4);

		var c2 = game.physics.p2.createPrismaticConstraint(car.elements[0].body, car.elements[2].body, false, [72, 40], [0, 0], [10, 30]);
	    c2.upperLimitEnabled = true;
	    c2.upperLimit = game.physics.p2.pxm(0.2);
	    c2.lowerLimitEnabled = true;
	    c2.lowerLimit = game.physics.p2.pxm(-0.4);

		cursors = game.input.keyboard.createCursorKeys();
	    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    enterButton = game.input.keyboard.addKey(Phaser.Keyboard.E);

	    game.camera.follow(doge);

	}

	function enterCar () {
		game.camera.follow(car.elements[0].body);
		doge_props.is_in_car = true;
		doge.kill();
	}	

	function exitCar () {
		doge_props.is_in_car = false;
		doge.reset(600, 20);
		game.camera.follow(doge);
	}

	function blockHit (body, shapeA, shapeB, equation) {
		if (body !== null) {
			body.data.mass = 1;
		}
	}

	function render () {
		game.debug.inputInfo(32, 32);
	}

	function update() {

	    doge.body.velocity.x = 0;

	    var floorResult = checkIfCanJump();

	    if(enterButton.isDown && enterButton.repeats === 0) {
	    	if (doge_props.is_in_car) {
	    		exitCar();
	    	} else {
	    		enterCar();
	    	}
	    }

	   	if (cursors.left.isDown)
	    {
	    	if (!doge_props.is_in_car) {
		        doge.body.velocity.x = doge_props.x_velocity * -1;
		        doge_props.facing = 'left';
		        doge_props.state = 'moving';
		    } else {
		    	car.elements[1].body.rotateLeft(500);
	    		car.elements[2].body.rotateLeft(500);
		    }

	    }
	    else if (cursors.right.isDown)
	    {
	    	if (!doge_props.is_in_car) {
	    		doge.body.velocity.x = doge_props.x_velocity;
	        	doge_props.facing = 'right';
	        	doge_props.state = 'moving';
	    	} else {
	    		car.elements[1].body.rotateRight(500);
	    		car.elements[2].body.rotateRight(500);
	    	}
	    }
	    else
	    {
	        doge_props.state = 'idle';
	    }

	    if (doge_props.facing == 'left')
	    {
	    	if (floorResult) {
	    		if (doge_props.state == 'moving') {
	    			doge.animations.play('left');
	    		} else {
	    			doge.animations.play('stopped_left');
	    		}

	    	} else {
	    		if (doge.body.velocity.y < 0) {
					doge.animations.play('fly_up_left');
	    		} else {
					doge.animations.play('fly_down_left');
	    		}
	    	}
	   	}

	    if (doge_props.facing == 'right')
	    {
	    	if (floorResult) {
	    		if (doge_props.state == 'moving') {
	    			doge.animations.play('right');
	    		} else {
	    			doge.animations.play('stopped_right');
	    		}
	    	} else {
	    		if (doge.body.velocity.y < 0) {
					doge.animations.play('fly_up_right');
	    		} else {
					doge.animations.play('fly_down_right');
	    		}
	    	}
	   	}


	    if ( (cursors.up.isDown || jumpButton.isDown) && floorResult)
	    {
	        doge.body.velocity.y = -400;
	    }

	}

	function checkIfCanJump() {

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

	function createSky () {
		var skyBitmap 	= game.add.bitmapData(3500, wHeight);
		var skyGradient = skyBitmap.context.createLinearGradient(0,0,0,wHeight);
		skyGradient.addColorStop(0, '#91a1f8');
		skyGradient.addColorStop(1, '#557cac');
		skyBitmap.context.fillStyle = skyGradient;
		skyBitmap.context.fillRect(0,0,3500,wHeight);
		game.add.sprite(0, 0, skyBitmap);
	}

	function createDoge () {
		doge = game.add.sprite(500, 0, 'doge');
		
		doge.animations.add('right', [1,2,3,4,5,6,7,8], 15, true);
		doge.animations.add('left', [11,12,13,14,15,16,17,18], 15, true);

		doge.animations.add('stopped_right', [0], 15, true);
		doge.animations.add('stopped_left', [19], 15, true);

		doge.animations.add('fly_up_right', [20], 15, true);
		doge.animations.add('fly_down_right', [21], 15, true);
		doge.animations.add('fly_up_left', [27], 15, true);
		doge.animations.add('fly_down_left', [26], 15, true);
	}

});