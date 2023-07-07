class Gameboard {
	#boardSize = 10;
	#ships = [];
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
		let shipCoordinates = ship.getCoordinates();

		if (shipCoordinates.filter(coordinate => coordinates.equals(coordinate)).length > 0)
			return true;

		return false;
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
}

module.exports = Gameboard;
