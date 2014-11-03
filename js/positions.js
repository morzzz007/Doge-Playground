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
    	frontend	: { x: 1315, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	skills		: { x: 1555, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	angular 	: { x: 1364, 		y: 185 + 47, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	knockout 	: { x: 1364, 		y: 185 + 88, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	jquery 		: { x: 1364, 		y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	underscore  : { x: 1364 + 86, 	y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	karma 		: { x: 1364, 		y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	jasmine 	: { x: 1364 + 84, 	y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	bower 		: { x: 1364, 		y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	grunt 		: { x: 1364 + 82, 	y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	bootstrap 	: { x: 1364, 		y: 185 + 202, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},

    	html5 		: { x: 1364, 		y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    	css3 		: { x: 1364 + 77, 	y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge', 'car', 'wheel', 'history']},
    },
    car: {
    	head		: { x: 800, 		y: 400, collisionGroup: 'car', collides: ['skills', 'contact', 'doge', 'history']},
        car         : { x: 800,         y: 400, collisionGroup: 'car', collides: ['skills', 'contact', 'doge', 'history']},
        fwheel      : { x: 800,         y: 500, circle: true, collisionGroup: 'wheel', collides: ['skills', 'contact', 'doge', 'history']},
        rwheel      : { x: 880,         y: 500, circle: true, collisionGroup: 'wheel', collides: ['skills', 'contact', 'doge', 'history']},
    },
    history: {
        timeline    : { x: 1900,        y: 350, collisionGroup: 'history', motionstate: 'static', scene: true, collides: ['doge', 'skills', 'contact', 'car', 'wheel']},
        sign_2005   : { x: 1900 + (1*90 + 0*65),        y: 290, collisionGroup: 'history', motionstate: 'static', scene: true, collides: []},
        sign_2007   : { x: 1900 + (2*90 + 1*65),        y: 290, collisionGroup: 'history', motionstate: 'static', scene: true, collides: []},
        sign_2009   : { x: 1900 + (3*90 + 2*65),        y: 290, collisionGroup: 'history', motionstate: 'static', scene: true, collides: []},
        sign_2011   : { x: 1900 + (4*90 + 3*65),        y: 290, collisionGroup: 'history', motionstate: 'static', scene: true, collides: []},
        sign_2013   : { x: 1900 + (5*90 + 4*65),        y: 290, collisionGroup: 'history', motionstate: 'static', scene: true, collides: []},
    }

});