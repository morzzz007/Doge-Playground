define(["positions"], function (positions) {

	'use strict';

	return {
		CollisionGroupFactory: function (game) {

			this.groups = {};

			this.summarizeGroups = function () {

				var groupsToCreate = [];

				groupsToCreate.push('background');

				_.each(positions, function (sub_domain) {
					_.each(sub_domain, function (obj) {
						if (!_.isUndefined(obj.collisionGroup)) {
							groupsToCreate.push(obj.collisionGroup);
						}
					});
				});

				this.groups = _.uniq(groupsToCreate);
				console.info('Collision groups found:', this.groups);

			};

			this.createGroups = function (collisionGroups) {

				_.each(this.groups, function (group) {
					collisionGroups[group] = game.physics.p2.createCollisionGroup();
				});

				console.info('Collision groups created.');
			};

		}
	};
});