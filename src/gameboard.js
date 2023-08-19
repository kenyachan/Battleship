class Gameboard {
	maxWidth = 9;
	maxHeight = 9;

	#squares = [];
	#ships = [];

	constructor(width, height, Coordinates) {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let square = {
					coordinates : new Coordinates(x, y),
					ship : undefined,
					shotReceived : false
				};

				this.#squares.push(square);
			}
		}

		this.maxWidth = width - 1;
		this.maxHeight = height - 1;
	}
/*	
	constructor(board) {
		this.#squares = board;
		this.maxWidth = Math.max(...board.map(square => square.coordinates.x));
		this.maxHeight = Math.max(...board.map(square => square.coordinates.y));
	}
*/
	placeShip(ship, position) {
		if (position.some(coordinates => this.#outOfBounds(coordinates)))
			return false;

		if (position.some(coordinates => this.#overlap(coordinates,
			this.#squares))) 
			return false;

		position.forEach(coordinate => 
			this.#squares.find(square =>
				square.coordinates.equals(coordinate)
			).ship = ship
		);

		this.#ships.push(ship);

		return true; 
	}

	#overlap(coordinates, boardSquares) { 
		return boardSquares.find(square =>
		square.coordinates.equals(coordinates) && square.ship) 
	}

	#outOfBounds(coordinates) {
		return (
			coordinates.x < 0 || coordinates.x > this.maxWidth ||
			coordinates.y < 0 || coordinates.y > this.maxHeight
		) 
			? true : false;
	}

	getShips() {
		return this.#ships;
	}

	getSquares() {
		return this.#squares;
	}

	receiveAttack(attackCoordinates) {
		if (this.#outOfBounds(attackCoordinates))
			return false;

		let targetSquare = this.#squares.find(square => square.coordinates.equals(attackCoordinates));
		
		if (targetSquare.shotReceived)
			return false;
		
		targetSquare.shotReceived = true;

		if (targetSquare.ship) {
			targetSquare.ship.hit();
			return true;
		}

		return false;
	}

	allShipsSunk() {
		return this.#ships.every(ship => ship.isSunk());
	}
}

module.exports = Gameboard;
