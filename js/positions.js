define({
    aboutme: {
    	bigPicture 	: { x: 20, y: 3, 
    					motionstate: 'static', collisionGroup: 'bigpicture'},
    	email 		: { x: 20, y: 396 + 5, 
    					motionstate: 'static',  collisionGroup: 'contact', collides: ['contact', 'doge', 'skills', 'car', 'wheel'] },
    	facebook 	: { x: 20, y: 396 + 5 + 54 + 5, 
    					motionstate: 'static', collisionGroup: 'contact', collides: ['contact', 'doge', 'skills', 'car', 'wheel'] },
    	linkedin 	: { x: 20, y: 396 + 5 + 2*54 + 2*5, 
    					motionstate: 'static', collisionGroup: 'contact', collides: ['contact', 'doge', 'skills', 'car', 'wheel'] },
    	header 		: { x: 520, y: 195, motionstate: 'static' }
    },
    skills: {
    	frontend	: { x: 1315, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	skills		: { x: 1555, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	angular 	: { x: 1364, 		y: 185 + 47, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	knockout 	: { x: 1364, 		y: 185 + 88, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	jquery 		: { x: 1364, 		y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	underscore  : { x: 1364 + 86, 	y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	karma 		: { x: 1364, 		y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	jasmine 	: { x: 1364 + 84, 	y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	bower 		: { x: 1364, 		y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	grunt 		: { x: 1364 + 82, 	y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	bootstrap 	: { x: 1364, 		y: 185 + 202, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},

    	html5 		: { x: 1364, 		y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    	css3 		: { x: 1364 + 77, 	y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel']},
    },
    car: {
    	car			: { x: 500, 		y: 400, collisionGroup: 'car', collides: ['skills', 'contact', 'doge']},
    	fwheel		: { x: 500, 		y: 500, circle: true, collisionGroup: 'wheel', collides: ['skills', 'contact', 'doge']},
    	rwheel		: { x: 550, 		y: 500, circle: true, collisionGroup: 'wheel', collides: ['skills', 'contact', 'doge']}
    },

});