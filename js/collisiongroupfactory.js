define(["positions"], function (positions) {
	return {
		CollisionGroupFactory: function (game) {

			this.groups;

			this.summarizeGroups = function () {

				var groupsToCreate = [];

				_.each(positions, function (sub_domain) {
					_.each(sub_domain, function (obj) {
						if (!_.isUndefined(obj.collisionGroup)) {
							groupsToCreate.push(obj.collisionGroup);
						};
					})
				});

				this.groups = _.uniq(groupsToCreate);
				console.info('Collision groups found:', this.groups);

			};

			this.createGroups = function (collisionGroups) {

				_.each(this.groups, function (group) {
					collisionGroups[group] = game.physics.p2.createCollisionGroup();
				});

				console.info('Collision groups created.');
			}

		}
	}
});