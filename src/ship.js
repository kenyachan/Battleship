const TYPE = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']; 
const LENGTHS = [5, 4, 3, 3, 2];

class Ship {
	#length;
	#type;
	#hits;

	constructor(type) {
		this.#type = type;
		this.#length = LENGTHS[TYPE.indexOf(type)];
		this.#hits = 0;
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
}

module.exports = Ship;
