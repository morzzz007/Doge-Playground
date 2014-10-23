define('main', ['require', 'imagestash', 'collisiongroupfactory', 'debuginfo', 'doge', 'car', 'buttons'], 
	function (require, imgStash, colFactory, debugInfo, _doge, _car, buttons) {

	'use strict';

	var game = new Phaser.Game(window.innerWidth, 580, Phaser.AUTO, 'doge-playground',
		{ preload: preload, create: create, update: update, render: render });
	

	var collisionGroups = {};
	var collisionGroupFactory = new colFactory.CollisionGroupFactory(game);
	var aboutMe 	= new imgStash.ImageStash(game, 'aboutme');
	var skills  	= new imgStash.ImageStash(game, 'skills');
	var doge		= new _doge.Doge(game);
	var car 		= new _car.Car(game);

	var wWidth = window.innerWidth;
	var wHeight = 580;

	function preload() {
		doge.preload();
	    game.load.image('background_tile', 'assets/background.png');
	    aboutMe.load();
	    skills.load();
	    car.preload();
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
		doge.create(collisionGroups);

		game.physics.p2.updateBoundsCollisionGroup();

    	var worldMaterial 	= game.physics.p2.createMaterial('worldMaterial');
		var fontMaterial 	= game.physics.p2.createMaterial('fontMaterial');
		_.each(skills.elements, function (element) {
			game.physics.p2.setMaterial(fontMaterial, [element.body]);
		});
		
		car.createContactMaterialWithWheels(worldMaterial, 10);
		car.createContactMaterialWithWheels(fontMaterial, 100);

    	game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

		car.createConstraints();   

		buttons.setupButtons(game);

	    debugInfo(game);
	    doge.cameraFollow();

	}

	// function enterCar () {
	// 	game.camera.follow(car.elements[1].body);
	// 	doge_props.is_in_car = true;
	// 	doge.kill();
	// 	car.elements[0].revive();
	// 	c3 = game.physics.p2.createPrismaticConstraint(car.elements[1].body, car.elements[0].body, true, [-20, -40], [0, 0], [10, 40]);
	//     c3.upperLimitEnabled = true;
	//     c3.upperLimit = game.physics.p2.pxm(0.2);
	//     c3.lowerLimitEnabled = true;
	//     c3.lowerLimit = game.physics.p2.pxm(-0.4);	    
	// }	

	// function exitCar () {
	// 	doge_props.is_in_car = false;
	// 	doge.reset(600, 20);
	// 	game.physics.p2.removeConstraint(c3);
	// 	car.elements[0].kill();
	// 	game.camera.follow(doge);
	// }

	function render () {
		// game.debug.inputInfo(32, 32);
	}

	function update() {

		if (!doge.is_in_car) {
			doge.update();
		} else {
			car.update();
		}

	    // if(enterButton.isDown && enterButton.repeats === 0) {
	    // 	if (doge_props.is_in_car) {
	    // 		exitCar();
	    // 	} else {
	    // 		enterCar();
	    // 	}
	    // }



	}

	function createSky () {
		game.add.tileSprite(0, 0, 3500, wHeight, 'background_tile');
	}

});