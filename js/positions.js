define({
    aboutme: {
    	bigPicture 	: { x: 20, y: 3, 
    					motionstate: 'static', collisionGroup: 'bigpicture'},
    	email 		: { x: 20, y: 396 + 5,  collisionGroup: 'contact', collides: ['contact', 'doge'] },
    	facebook 	: { x: 20, y: 396 + 5 + 54 + 5, collisionGroup: 'contact', collides: ['contact', 'doge'] },
    	linkedin 	: { x: 20, y: 396 + 5 + 2*54 + 2*5, collisionGroup: 'contact', collides: ['contact', 'doge'] },
    	header 		: { x: 520, y: 195, motionstate: 'static' }
    }
});