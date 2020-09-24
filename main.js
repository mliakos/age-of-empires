const fs = require("fs");
const stdin = process.openStdin();

// Retrieving saved state
const state = JSON.parse(fs.readFileSync("state.json", "utf-8"));

// Initializing global state object
global.STATE = JSON.parse(
	fs.readFileSync("./sample/sampleState.json", "utf-8")
);

// Imports
const settings = JSON.parse(fs.readFileSync("config/settings.json", "utf-8"));
const Peasant = require("./model/Peasant");
const Gatherer = require("./model/Gatherer");
const displayStats = require("./controller/commands/displayStats");
const displayInventory = require("./controller/commands/displayInventory");
const move = require("./controller/commands/move");
const gather = require("./controller/commands/gather");

// Create 1000 Peasants (first time only)
if (settings.firstRun) {
	console.log("Welcome! Creating 1000 peasants...");
	for (let i = 0; i < settings.initialPeasants; i++) {
		global.STATE.activePeasants.push(new Peasant(`P${i + 1}`));
	}

	fs.writeFileSync(
		"config/settings.json",
		JSON.stringify({ ...settings, firstRun: false })
	);
}

/* 
The reason why I created a state object filled with every element and not simply
a key value pair, containing only the number of peasants/gatherers (i.e. {activePeasants: 145}), 
is the fact that we indeed care about their names. Consequently they should be stored individually. 
*/

// Populate state object
else {
	console.log("Welcome back!");
	console.log("Loading peasants...");

	// Retrieving saved peasants
	for (peasant of state.activePeasants) {
		new Peasant(peasant.name);
	}

	console.log("Loading gatherers...");
	// Retrieving saved gatherers
	for (gatherer of state.activeGatherers) {
		new Gatherer(gatherer.name, gatherer.specialty);
	}

	console.log("Loading inventory...");
	// Retrieving saved inventory
	global.STATE.inventory = state.inventory;

	console.log("Loading total number of movements...");
	// Retrieving saved "totalMoved" counter
	global.STATE.totalMoved = state.totalMoved;
}

// Handling commands
stdin.addListener("data", function (d) {
	// Parsing command
	const command = d.toString().trim();

	if (command.toLowerCase() == "stats") {
		displayStats();
	}

	// Display inventory command
	else if (command.toLowerCase() == "inventory") {
		displayInventory();
	}

	// Move command
	else if (command.toLowerCase().includes("move")) {
		move(command, settings);
	}

	// Gather command
	else if (command.toLowerCase().includes("gather")) {
		gather(command, state, Gatherer);
	} else {
		console.log("Error in command.");
	}
});

// Persisting state on file
process.on("SIGINT", () => {
	const state = global.STATE;
	fs.writeFileSync(
		"state.json",
		JSON.stringify({
			inventory: {
				food: state.inventory.food,
				wood: state.inventory.wood,
				gold: state.inventory.gold,
				iron: state.inventory.iron
			},
			activePeasants: state.activePeasants.reduce((acc, curr) => {
				acc.push({ name: curr.name });
				return acc;
			}, []),
			activeGatherers: state.activeGatherers.reduce((acc, curr) => {
				acc.push({ name: curr.name, specialty: curr.specialty });
				return acc;
			}, []),
			totalMoved: state.totalMoved
		})
	);

	process.exit();
});
