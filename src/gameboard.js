class Gameboard {
	#boardSize;
	squares = [];
	ships = [];

	constructor(size = 10) {
		this.#boardSize = size * size;

		for (let i = 1; i <= this.#boardSize; i++) {
			let square = {
				coordinates : i,
				ship : undefined,
				shotReceived : false
			};

			this.squares.push(square);
		}
	}

	placeShip(ship, position) {
		if (position.some(coordinates => this.#outOfBounds(coordinates)))
			return false;

		let boardPosition = this.squares.filter(square => position.includes(square.coordinates));

		if (boardPosition.some(square => square.ship))
			return false;

		boardPosition.forEach(square => square.ship = ship);

		this.ships.push(ship);

		return true; 
	}

	#outOfBounds(coordinates) {
		return (coordinates < 1 || coordinates > this.#boardSize) ? true : false;
	}

	receiveAttack(coordinates) {
		if (this.#outOfBounds(coordinates))
			throw new Error(`Square out of bounds: ${coordinates}`);

		let targetSquare = this.squares.find(square => square.coordinates = coordinates);

		if (targetSquare.shotReceived)
			throw new Error('Cannot shoot the same coordinates more than once');

		targetSquare.shotReceived = true;

		if (targetSquare.ship)
			targetSquare.ship.hit();

		return targetSquare;
	}

	allShipsSunk() {
		return this.ships.every(ship => ship.isSunk());
	}
}

module.exports = Gameboard;
