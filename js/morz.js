var game = new Phaser.Game(window.innerWidth, 500, Phaser.AUTO, 'doge-playground',
	{ preload: preload, create: create, update: update, render: render });

var doge;
var logo;
var skills;
var skillsPoints = [
	{x: 400, 				y: 100},
	{x: 400 + 153 + 10, 	y: 100},
	{x: 450, 				y: 160},
	{x: 450, 				y: 210},
	{x: 450, 				y: 255},
	{x: 450 + 74 + 5, 		y: 255},
	{x: 450, 				y: 298},
	{x: 450 + 67 + 5, 		y: 298},
	{x: 450 + 67 + 5 + 64 + 5, 	y: 298},
	{x: 450, 				y: 340},
	{x: 450 + 53 + 5, 		y: 340},
];

var wWidth = window.innerWidth;
var wHeight = 500;

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
    game.load.image('logo', 'assets/logo.png');

    game.load.image('sk_1', 'assets/skills/1.png');
    game.load.image('sk_2', 'assets/skills/2.png');
    game.load.image('sk_3', 'assets/skills/3.png');
    game.load.image('sk_4', 'assets/skills/4.png');
    game.load.image('sk_5', 'assets/skills/5.png');
    game.load.image('sk_6', 'assets/skills/6.png');
    game.load.image('sk_7', 'assets/skills/7.png');
    game.load.image('sk_8', 'assets/skills/8.png');
    game.load.image('sk_9', 'assets/skills/9.png');
    game.load.image('sk_10', 'assets/skills/10.png');
    game.load.image('sk_11', 'assets/skills/11.png');

    game.load.physics('physicsData', 'assets/marton.json')

}

function create() {
	game.world.setBounds(0, 0, 3500, wHeight);
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 500;
	game.physics.p2.restitution = 0.2;
	

	createSky();
	createLogo();
	createDoge();
	createSkills();

	game.physics.p2.enable([doge]);

	doge.body.fixedRotation = true;
	doge.body.collideWorldBounds = true;
	doge.body.onBeginContact.add(blockHit, this);
	cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.camera.follow(doge);

}

function blockHit (body, shapeA, shapeB, equation) {
	console.log(shapeA);
	if (body != null) {
		console.log(body)
		body.motionState = Phaser.Physics.P2.Body.DYNAMIC;
	};
}

function render () {
	game.debug.inputInfo(32, 32);
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
	var skyBitmap 	= game.add.bitmapData(wWidth, wHeight);
	var skyGradient = skyBitmap.context.createLinearGradient(0,0,0,wHeight);
	skyGradient.addColorStop(0,"#91a1f8");
	skyGradient.addColorStop(1,"#557cac");
	skyBitmap.context.fillStyle=skyGradient;
	skyBitmap.context.fillRect(0,0,wWidth,wHeight);
	game.add.sprite(0, 0, skyBitmap);
}

function createDoge () {
	doge = game.add.sprite(100, 200, 'doge');
	
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

function createLogo () {
	logo = game.add.sprite(100, 130, 'logo');
}