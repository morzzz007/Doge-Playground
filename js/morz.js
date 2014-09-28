var game = new Phaser.Game(window.innerWidth, 500, Phaser.AUTO, 'doge-playground',
	{ preload: preload, create: create, update: update });

var doge;
var wWidth = window.innerWidth;
var wHeight = 500;

var doge_props = {
	x_velocity : 150,
	facing: 'right',
	state: 'idle'
};

var facing;
var jumpTimer;
var cursors;
var jumpButton;

function preload() {

    game.load.spritesheet('doge', 'assets/doge_run.png', 80, 80, 28);

}

function create() {
	
	var skyBitmap 	= game.add.bitmapData(wWidth, wHeight);
	var skyGradient = skyBitmap.context.createLinearGradient(0,0,0,wHeight);
	skyGradient.addColorStop(0,"#91a1f8");
	skyGradient.addColorStop(1,"#557cac");
	skyBitmap.context.fillStyle=skyGradient;
	skyBitmap.context.fillRect(0,0,wWidth,wHeight);
	game.add.sprite(0, 0, skyBitmap);	

	doge = game.add.sprite(300, 200, 'doge');
	
	doge.animations.add('right', [1,2,3,4,5,6,7,8], 15, true);
	doge.animations.add('left', [11,12,13,14,15,16,17,18], 15, true);

	doge.animations.add('stopped_right', [0], 15, true);
	doge.animations.add('stopped_left', [19], 15, true);

	doge.animations.add('fly_up_right', [20], 15, true);
	doge.animations.add('fly_down_right', [21], 15, true);
	doge.animations.add('fly_up_left', [27], 15, true);
	doge.animations.add('fly_down_left', [26], 15, true);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.enable([doge]);
	game.physics.arcade.gravity.y = 500;

	doge.body.bounce.y = 0.15;
	doge.body.collideWorldBounds = true;

	cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {

    doge.body.velocity.x = 0;

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
    	if (doge.body.onFloor()) {
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
    	if (doge.body.onFloor()) {
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


    if ( (cursors.up.isDown || jumpButton.isDown) && doge.body.onFloor())
    {
        doge.body.velocity.y = -400;
    }

}