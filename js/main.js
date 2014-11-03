define('main', ['require', 'imagestash', 'collisiongroupfactory', 'debuginfo', 'doge', 'car', 'history', 'buttons', 'background','materials', 'helperbubble', 'gamestate'], 
	function (require, imgStash, colFactory, debugInfo, _doge, _car, _history, buttons, _background, materials, helperbubble, gamestate) {

	'use strict';

	var game = new Phaser.Game(window.innerWidth, 645, Phaser.AUTO, 'doge-playground',
		{ preload: preload, create: create, update: update, render: render });
	

	var collisionGroups = {};
	var collisionGroupFactory = new colFactory.CollisionGroupFactory(game);
	var aboutMe 	= new imgStash.ImageStash(game, 'aboutme');
	var skills  	= new imgStash.ImageStash(game, 'skills');
	var background 	= new _background.Background(game);
	var doge		= new _doge.Doge(game);
	var car 		= new _car.Car(game);
	var history 	= new _history.History(game);

	var wWidth = 3500;
	var wHeight = 645;

	function preload() {
		helperbubble.setup(game);
		gamestate.setup(game);
		background.preload();
		helperbubble.preload();
		doge.preload();
	    car.preload();
	    history.preload();
	    aboutMe.load();
	    skills.load();
	    collisionGroupFactory.summarizeGroups();
	}

	function create() {
		
		game.world.setBounds(0, 0, wWidth, wHeight);
		game.physics.startSystem(Phaser.Physics.P2JS);

		materials.createMaterials(game);

		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 500;
		game.physics.p2.restitution = 0.2;
		
		collisionGroupFactory.createGroups(collisionGroups);
		collisionGroups.doge = game.physics.p2.createCollisionGroup();

		background.create(wWidth, wHeight, collisionGroups);
		aboutMe.create(collisionGroups);
		skills.create(collisionGroups);
		car.create(collisionGroups);
		doge.create(collisionGroups);
		history.create(collisionGroups);
		helperbubble.create();

		game.physics.p2.updateBoundsCollisionGroup();

		_.each(skills.elements, function (element) {
			game.physics.p2.setMaterial(materials.fontMaterial, [element.body]);
		});
		
		car.createContactMaterialWithWheels(materials.worldMaterial, 100);
		car.createContactMaterialWithWheels(materials.fontMaterial, 100);

    	game.physics.p2.setWorldMaterial(materials.worldMaterial, true, true, true, true);

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
		helperbubble.update();
		history.update();
	}

});