const TYPE = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer']; 
const LENGTHS = [5, 4, 3, 3, 2];

function Ship(type) {
	let _type = type;
	let _hits = 0;
	let _length = LENGTHS[TYPE.indexOf(type)];

	return {
		get length() {
			return _length;
		},

		get type() {
			return _type;
		},

		hits() {
			return _hits;
		},

		isSunk() {
			return _hits < _length ? false : true;
		},

		hit() {
			return _hits <= _length ? _hits += 1 : _hits;
		}

	}
}

module.exports = Ship;
