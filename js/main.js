define('main', ['require', 'imagestash', 'collisiongroupfactory', 'debuginfo', 'doge', 'car', 'buttons', 'background', 'bubble', 'gamestate'], 
	function (require, imgStash, colFactory, debugInfo, _doge, _car, buttons, _background, bubble, gamestate) {

	'use strict';

	var game = new Phaser.Game(window.innerWidth, 580, Phaser.AUTO, 'doge-playground',
		{ preload: preload, create: create, update: update, render: render });
	

	var collisionGroups = {};
	var collisionGroupFactory = new colFactory.CollisionGroupFactory(game);
	var aboutMe 	= new imgStash.ImageStash(game, 'aboutme');
	var skills  	= new imgStash.ImageStash(game, 'skills');
	var background 	= new _background.Background(game);
	var doge		= new _doge.Doge(game);
	var car 		= new _car.Car(game);

	var wWidth = 3500;
	var wHeight = 580;

	function preload() {
		bubble.setup(game);
		gamestate.setup(game);
		background.preload();
		bubble.preload();
		doge.preload();
	    car.preload();
	    aboutMe.load();
	    skills.load();
	    collisionGroupFactory.summarizeGroups();
	}

	function create() {
		
		game.world.setBounds(0, 0, wWidth, wHeight);
		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 500;
		game.physics.p2.restitution = 0.2;
		
		collisionGroupFactory.createGroups(collisionGroups);
		collisionGroups.doge = game.physics.p2.createCollisionGroup();

		background.create(wWidth, wHeight);
		aboutMe.create(collisionGroups);
		skills.create(collisionGroups);
		car.create(collisionGroups);
		doge.create(collisionGroups);
		bubble.create();

		game.physics.p2.updateBoundsCollisionGroup();

    	var worldMaterial 	= game.physics.p2.createMaterial('worldMaterial');
		var fontMaterial 	= game.physics.p2.createMaterial('fontMaterial');
		_.each(skills.elements, function (element) {
			game.physics.p2.setMaterial(fontMaterial, [element.body]);
		});
		
		car.createContactMaterialWithWheels(worldMaterial, 100);
		car.createContactMaterialWithWheels(fontMaterial, 100);

    	game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

		car.createConstraints();   

		buttons.setupButtons(game);

	    debugInfo(game);
	    doge.cameraFollow();

	}

	function render () {
		// game.debug.inputInfo(32, 32);
	}

	function update() {
		doge.update();
		car.update();
		bubble.update();
	}

});