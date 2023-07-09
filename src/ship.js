const TYPE = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']; 
const LENGTHS = [5, 4, 3, 3, 2];

class Ship {
	#length;
	#type;
	#hits = [];
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

	hit(attackCoordinates) {
		if (attackCoordinates instanceof this.#Coordinates === false)
			throw new Error("Argument must be Coordinates");

		if (this.#hits.filter(coordinates => attackCoordinates.equals(coordinates)).length > 0)
			throw new Error("Ship cannot be hit in the same coordinates more than once");

		this.#hits.push(attackCoordinates);
	}

	getCoordinates() {
		return this.#coordinates;
	}
}

module.exports = Ship;
