class Coordinates {
	#x;
	#y;

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}

	get x() {
		return this.#x;
	}

	set x(newX) {
		this.#x = newX;
	}

	get y() {
		return this.#y;
	}

	set y(newY) {
		this.#y = newY;
	}

	equals(coordinates) {
		if(!(coordinates instanceof Coordinates))
			throw new Error(`"${coordinates}" is not an instance of Coordinates.`);

		return (coordinates.x === this.#x) && (coordinates.y === this.#y) ?
			true : false;
	}

	toString() {
		return `(${this.#x},${this.#y})`;
	}

}

class Position {
	#coordinates = [];

	constructor(initialCoordinates, length, direction) {
		for (let i = 0; i < length; i++) {
			let coordinates;

			if (direction === 'horizontal')
				coordinates = new Coordinates(initialCoordinates.x + i, initialCoordinates.y);

			if (direction === 'vertical')
				coordinates = new Coordinates(initialCoordinates.x, initialCoordinates.y + i);

			this.#coordinates.push(coordinates);
		}
	}

	getCoordinates() {
		return this.#coordinates;
	}
}

module.exports = Coordinates;
