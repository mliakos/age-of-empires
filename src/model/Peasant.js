class Peasant {
	constructor(name) {
		this.name = name;

		// Update state
		global.STATE.activePeasants.push(this);
	}

	move(direction) {
		global.STATE.totalMoved += 1;
		console.log(
			`${this.constructor.name} ${this.name} moved ${direction.toLowerCase()}!`
		);
	}
}

module.exports = Peasant;
