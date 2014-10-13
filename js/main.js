define(function (require) {

	var imgStash = require('imagestash');

	var game = new Phaser.Game(window.innerWidth, 580, Phaser.AUTO, 'doge-playground',
		{ preload: preload, create: create, update: update, render: render });
	
	var collisionGroups = {};

	var aboutMe = new imgStash.ImageStash(game, 'aboutme');
	

	var doge;

	var wWidth = window.innerWidth;
	var wHeight = 580;

	var doge_props = {
		x_velocity : 300,
		facing: 'right',
		state: 'idle'
	};

	var facing;
	var jumpTimer;
	var cursors;
	var jumpButton;


	function preload() {
	    game.load.spritesheet('doge', 'assets/doge_run.png', 80, 76, 28);    
	    aboutMe.load();
	}

	function create() {
		
		game.world.setBounds(0, 0, 3500, wHeight);
		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 500;
		game.physics.p2.restitution = 0.2;
		
		collisionGroups.doge = game.physics.p2.createCollisionGroup();
		collisionGroups.other = game.physics.p2.createCollisionGroup();


		createSky();
		aboutMe.create(collisionGroups);
		createDoge();

		// createSkills();
		game.physics.p2.updateBoundsCollisionGroup();

		game.physics.p2.enable([doge]);

		doge.body.fixedRotation = true;
		doge.body.collideWorldBounds = true;
		doge.body.onBeginContact.add(blockHit, this);
        doge.body.setCollisionGroup(collisionGroups.doge);
        doge.body.collides([collisionGroups.other]);

		cursors = game.input.keyboard.createCursorKeys();
	    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    game.camera.follow(doge);



		game.physics.p2.createSpring(aboutMe.elements[0], aboutMe.elements[1], 180, 100, 1);
		game.physics.p2.createSpring(aboutMe.elements[1], aboutMe.elements[2], 10, 20, 1);
		game.physics.p2.createSpring(aboutMe.elements[2], aboutMe.elements[3], 10, 10, 1);	

	}

	function blockHit (body, shapeA, shapeB, equation) {
		if (body != null) {
			body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
		};
	}

	function render () {
		// game.debug.inputInfo(32, 32);
	}

	function update() {

	    doge.body.velocity.x = 0;

	    var floorResult = checkIfCanJump();

	   	if (cursors.left.isDown)
	    {
	        doge.body.velocity.x = doge_props.x_velocity * -1;
	        doge_props.facing = 'left';
	        doge_props.state = 'moving';
	    }
	    else if (cursors.right.isDown)
	    {
	        doge.body.velocity.x = doge_props.x_velocity;
	        doge_props.facing = 'right';
	        doge_props.state = 'moving';
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
		skyGradient.addColorStop(0,"#91a1f8");
		skyGradient.addColorStop(1,"#557cac");
		skyBitmap.context.fillStyle=skyGradient;
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

	function createSkills () {
		skills = game.add.group();

		var left_offset = 190;

		for (var i = 1; i < 12; i++) {
			var skill = skills.create(skillsPoints[i-1].x + left_offset, skillsPoints[i-1].y, "sk_" + i);

			// set left coordinate relative to new anchor
			skill.x = skill.x + (skill.width/2);
			skill.y = skill.y + (skill.height/2);

	        game.physics.p2.enable(skill);
	        skill.body.motionState = Phaser.Physics.P2.Body.STATIC;
	        skill.body.onBeginContact.add(blockHit, this);
		};
	}


});