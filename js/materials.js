'use strict';

define({

	worldMaterial: null,
	wheelMaterial: null,

	createMaterials : function (game) {
    	this.worldMaterial 	= game.physics.p2.createMaterial('worldMaterial');
		this.fontMaterial 	= game.physics.p2.createMaterial('fontMaterial');
	},

});