define({
    aboutme: {
    	bigPicture 	: { x: 20, y: 3, 
    					motionstate: 'static', collisionGroup: 'bigpicture'},
    	email 		: { x: 20, y: 396 + 5, 
    					motionstate: 'static',  collisionGroup: 'contact', collides: ['contact', 'doge', 'skills'] },
    	facebook 	: { x: 20, y: 396 + 5 + 54 + 5, 
    					motionstate: 'static', collisionGroup: 'contact', collides: ['contact', 'doge', 'skills'] },
    	linkedin 	: { x: 20, y: 396 + 5 + 2*54 + 2*5, 
    					motionstate: 'static', collisionGroup: 'contact', collides: ['contact', 'doge', 'skills'] },
    	header 		: { x: 520, y: 195, motionstate: 'static' }
    },
    skills: {
    	frontend	: { x: 1315, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	skills		: { x: 1555, 		y: 185, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	angular 	: { x: 1364, 		y: 185 + 47, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	knockout 	: { x: 1364, 		y: 185 + 88, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	jquery 		: { x: 1364, 		y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	underscore  : { x: 1364 + 86, 	y: 185 + 123, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	karma 		: { x: 1364, 		y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	jasmine 	: { x: 1364 + 84, 	y: 185 + 149, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	bower 		: { x: 1364, 		y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	grunt 		: { x: 1364 + 82, 	y: 185 + 175, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	bootstrap 	: { x: 1364, 		y: 185 + 202, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},

    	html5 		: { x: 1364, 		y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    	css3 		: { x: 1364 + 77, 	y: 185 + 228, motionstate: 'static', collisionGroup: 'skills', collides: ['contact', 'skills', 'doge']},
    },

});