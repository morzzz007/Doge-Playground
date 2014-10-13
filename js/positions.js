define({
    aboutme: {
    	bigPicture 	: { x: 10, y: 3, 
    					motionstate: 'static', collisionGroup: 'bigpicture'},
    	email 		: { x: 10, y: 396 + 5, collisionGroup: 'contact', collides: ['contact'] },
    	facebook 	: { x: 10, y: 396 + 5 + 54 + 5, collisionGroup: 'contact', collides: ['contact'] },
    	linkedin 	: { x: 10, y: 396 + 5 + 2*54 + 2*5, collisionGroup: 'contact', collides: ['contact'] },
    	header 		: { x: 520, y: 195, motionstate: 'static' }
    }
});