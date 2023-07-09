class Gameboard {
	#boardSize = 10;
	#ships = [];
	#attacksHistory = [];
	#missedAttacks = [];
	#Coordinates;

	constructor(Coordinates) {
		this.#Coordinates = Coordinates;
	}

	placeShip(ship, coordinates, direction) {
		if (this.#validateCoordinates(coordinates) === false)
			throw new Error('Invalid coordinates. Coordinates provided are out of range.');
		
		let extendedCoordinates = this.#extendCoordinates(coordinates, ship.length, direction);

		if (extendedCoordinates.every(coordinate => this.#validateCoordinates(coordinate)) === false)
			throw new Error('Invalid coordinates. Coordinates cannot extend beyond the board.');

		ship.setCoordinates(extendedCoordinates);

		this.#ships.push(ship);
	}

	getShips() {
		return this.#ships;
	}

	#validateCoordinates(coordinates) {
		if (!this.#withinBoardLimits(coordinates))
			return false;

		if (!this.#ships.every(ship => this.#overlap(coordinates, ship) === false))
			return false;

		return true;
	}

	#withinBoardLimits(coordinates) {
		if (coordinates.x < 0 ||
			coordinates.y < 0 ||
			coordinates.x > this.#boardSize - 1 ||
			coordinates.y > this.#boardSize - 1
		)
			return false;
		
		return true;
	}

	#overlap(coordinates, ship) {
		return ship.getCoordinates().find(shipCoordinates => shipCoordinates.equals(coordinates));
	}

	#extendCoordinates(initialCoordinates, length, direction) {
		let extendedCoordinates = [];

		for (let i = 0; i < length; i++) {
			let coordinates;

			if (direction === 'horizontal')
				coordinates = new this.#Coordinates(initialCoordinates.x + i, initialCoordinates.y);

			if (direction === 'vertical')
				coordinates = new this.#Coordinates(initialCoordinates.x, initialCoordinates.y + i);

			extendedCoordinates.push(coordinates);
		}

		return extendedCoordinates;
	}

	getAttacksHistory() {
		return this.#attacksHistory;
	}

	getMissedAttacks() {
		return this.#missedAttacks;
	}

	receiveAttack(attackCoordinates) {
		if (this.#validateAttack(attackCoordinates, this.#attacksHistory) === false)
			return null;

		this.#attacksHistory.push(attackCoordinates);

		let ship = this.#ships.find(
			ship => ship.getCoordinates().find(
				coordinates => coordinates.equals(attackCoordinates)
			)
		);

		if (ship) {
			ship.hit(attackCoordinates);
			return true;
		}

		this.#missedAttacks.push(attackCoordinates);

		return false;
	}

	#validateAttack(attackCoordinates, attacksHistory) {
		if (attacksHistory.find(coordinates => attackCoordinates.equals(coordinates)))
			return false;

		if (this.#withinBoardLimits(attackCoordinates) === false)
			return false;

		return true;
	}

	allShipsSunk() {
		return this.#ships.every(ship => ship.isSunk() === true);
	}
}

module.exports = Gameboard;
