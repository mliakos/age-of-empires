module.exports = () => {
	console.table({
		Peasants: global.STATE.activePeasants.length,
		"Food Gatherers": global.STATE.activeGatherers.filter(
			e => e.specialty == "food"
		).length,
		"Wood Gatherers": global.STATE.activeGatherers.filter(
			e => e.specialty == "wood"
		).length,
		"Gold Gatherers": global.STATE.activeGatherers.filter(
			e => e.specialty == "gold"
		).length,
		"Iron Gatherers": global.STATE.activeGatherers.filter(
			e => e.specialty == "iron"
		).length,
		"Total moved": global.STATE.totalMoved
	});
};
