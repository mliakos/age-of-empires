module.exports = (command, settings) => {
	const splitCommand = command.split(" ");
	const name = splitCommand[0];
	const action = splitCommand[1];
	const direction = splitCommand[2];

	if (
		name.match(/P[0-9]/gi) &&
		action.toLowerCase() == "move" &&
		settings.movementCommands
			.map(e => e.toLowerCase())
			.includes(direction.toLowerCase())
	) {
		const Peasant = global.STATE.activePeasants.find(
			e => e.name.toLowerCase() == name.toLowerCase()
		);

		// Verify that peasant exists (meaning index is not -1)
		if (Peasant) {
			Peasant.move(direction);
		} else {
			console.log(
				`Peasant ${name} does not exist. He has probably been promoted to a gatherer.`
			);
		}
	} else {
		console.log("Error in command.");
	}
};
