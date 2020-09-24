module.exports = (command, state, Gatherer) => {
	const splitCommand = command.split(" ");
	const name = splitCommand[0];
	const action = splitCommand[1];
	const specialty = splitCommand[2];

	if (
		name.match(/[A-Z][0-9]/gi) &&
		action == "gather" &&
		Object.keys(state.inventory).includes(specialty)
	) {
		// TODO: Handle not enough peasants cases and precedence

		// If villager is a peasant, remove him from array and create a new gatherer
		if (name[0].toLowerCase() == "p") {
			const index = global.STATE.activePeasants.findIndex(
				e => e.name.toLowerCase() == name.toLowerCase()
			);

			// Verify that peasant exists (meaning index is not -1)
			if (index != -1) {
				global.STATE.activePeasants.splice(index, 1);
				new Gatherer(`G${name.match(/[0-9]/g).join("")}`, specialty);
			} else {
				console.log(
					"Peasant is already a gatherer, but you can still switch his specialty."
				);
			}
		}
		// If villager is a gatherer, change his specialty
		else if (name[0].toLowerCase() == "g") {
			const Gatherer = global.STATE.activeGatherers.find(
				e => e.name.toLowerCase() == name.toLowerCase()
			);
			Gatherer.gather(specialty);
		}
	} else {
		console.log("Error in command.");
	}
};
