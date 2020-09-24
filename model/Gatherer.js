const fs = require("fs");

const settings = JSON.parse(fs.readFileSync("config/settings.json"));
const Peasant = require("../model/Peasant");

class Gatherer {
	constructor(name, specialty) {
		this.rate = 0;
		this.name = name;
		this.specialty = specialty;

		// Begin gathering automatically
		this.gather(this.specialty);

		// Update state
		global.STATE.activeGatherers.push(this);
	}

	gather(specialty) {
		this.specialty = specialty;

		// Set gathering rate based on specialty
		switch (this.specialty) {
			case "food":
				this.rate = settings.gatheringRate.food;
				break;
			case "wood":
				this.rate = settings.gatheringRate.wood;
				break;
			case "gold":
				this.rate = settings.gatheringRate.gold;
				break;
			case "iron":
				this.rate = settings.gatheringRate.iron;
				break;
		}

		// Clearing previous interval
		clearInterval(this.gatheringInterval);

		// Initializing new gathering interval
		this.gatheringInterval = setInterval(() => {
			global.STATE.totalMoved += 1;
			global.STATE.inventory[this.specialty] += this.rate;
		}, settings.gatheringInterval * 1000);
	}
}

module.exports = Gatherer;
