const TYPE = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']; 
const LENGTHS = [5, 4, 3, 3, 2];

class Ship {
	#length;
	#type;
	#hits = 0;
	#coordinates;
	#Coordinates;

	constructor(Coordinates) {
		this.#Coordinates = Coordinates;
	}

	set type(type) {
		if (TYPE.includes(type) === false)
			throw new Error(`${type} is not a valid type of ship`);

		this.#type = type;
		this.#length = LENGTHS[TYPE.indexOf(type)];
	}

	setCoordinates(coordinates) {
		this.#coordinates = coordinates;	
	}

	get type() {
		return this.#type;
	}

	get length() {
		return this.#length;
	}

	getHits() {
		return this.#hits;
	}

	isSunk() {
		return this.#hits < this.#length ? false : true;
	}

	hit() {
		this.#hits <= this.#length ? this.#hits += 1 : this.#hits;
	}

	getCoordinates() {
		return this.#coordinates;
	}
}

module.exports = Ship;
