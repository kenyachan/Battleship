class Gameboard {
	maxWidth = 9;
	maxHeight = 9;

	squares = [];
	#ships = [];

	constructor() {
		for (let i = 0; i < 100; i++) {
			let square = {
				ship : undefined,
				shotReceived : false
			};

			this.squares.push(square);
		}
	}

	placeShip(ship, position) {
		if (position.some(squareIndex => squareIndex < 0 || squareIndex > 99))
			return false;

		if (position.some(squareIndex => this.squares[squareIndex].ship))
			return false;

		position.forEach(squareIndex => this.squares[squareIndex].ship = ship);

		this.#ships.push(ship);

		return true; 
	}

	#outOfBounds(squareIndex) {
		return (squareIndex < 0 || squareIndex > 99) ? true : false;
	}

	getShips() {
		return this.#ships;
	}

	receiveAttack(targetSquare) {
		if (this.#outOfBounds(targetSquare))
			return false;

		if (this.squares[targetSquare].shotReceived)
			return false;

		this.squares[targetSquare].shotReceived = true;

		if (this.squares[targetSquare].ship) {
			this.squares[targetSquare].ship.hit();
			return true;
		}

		return false;
	}

	allShipsSunk() {
		return this.#ships.every(ship => ship.isSunk());
	}
}

module.exports = Gameboard;
