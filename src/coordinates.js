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

module.exports = Coordinates;
