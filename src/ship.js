const TYPE = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']; 
const LENGTHS = [5, 4, 3, 3, 2];

class Ship {
	#length;
	#type;
	#hits;
	#coordinates = [];

	constructor(type, coordinates, direction, Coordinates) {
		this.#type = type;
		this.#length = LENGTHS[TYPE.indexOf(type)];
		this.#hits = 0;
	
		if (Coordinates) {
			this.#initCoordinates(coordinates, direction, Coordinates); 
		}
	}

	#initCoordinates(coordinates, direction, Coordinates) {
		for (let i = 0; i < this.#length; i++) {
			let nextCoordinates;
			
			if (direction === 'horizontal')
				nextCoordinates = new Coordinates(coordinates.x + i, coordinates.y);

			if (direction === 'vertical')
				nextCoordinates = new Coordinates(coordinates.x, coordinates.y + 1);

			this.#coordinates.push(nextCoordinates);
		}
	}

	get type() {
		return this.#type;
	}

	get length() {
		return this.#length;
	}

	hits() {
		return this.#hits;
	}

	isSunk() {
		return this.#hits < this.#length ? false : true;
	}

	hit() {
		return this.#hits <= this.#length ? this.#hits += 1 : this.#hits;
	}

	coordinates() {
		return this.#coordinates;
	}
}

module.exports = Ship;
