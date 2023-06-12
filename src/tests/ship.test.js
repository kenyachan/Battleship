const Ship = require('../ship');

describe('Testing ship properties', () => {
	let destroyer = Ship('Destroyer');
	let cruiser = Ship('Cruiser');
	let sub = Ship('Submarine');
	let battleship = Ship('Battleship');
	let carrier = Ship('Carrier');

	test('Ship is a Destroyer', () => {
		expect(destroyer.type).toEqual('Destroyer');
	});

	test('Destroyer has length of 2', () => {
		expect(destroyer.length).toEqual(2);
	});

	test('Ship is a Cruiser', () => {
		expect(cruiser.type).toEqual('Cruiser');
	});

	test('Cruiser has length of 3', () => {
		expect(cruiser.length).toEqual(3);
	});

	test('Ship is a Submarine', () => {
		expect(sub.type).toEqual('Submarine');
	});

	test('Submarine has a length of 3', () => {
		expect(sub.length).toEqual(3);
	});

	test('Ship is a Battleship', () => {
		expect(battleship.type).toEqual('Battleship');
	});

	test('Battleship has a length of 4', () => {
		expect(battleship.length).toEqual(4);
	});

	test('Ship is a Carrier', () => {
		expect(carrier.type).toEqual('Carrier');
	});

	test('Carrier has a length of 5', () => {
		expect(carrier.length).toEqual(5);
	});
});

describe('Testing ship isSunk query', () => {
	let destroyer = Ship('Destroyer');

	test('isSunk returns false if destroyer is not sunk', () => {
		expect(destroyer.isSunk()).toBeFalsy();
	});

	test('isSunk returns true if destroyer is sunk', () => {
		destroyer.hit();
		destroyer.hit();

		expect(destroyer.isSunk()).toBeTruthy();
	});
});

describe('Testing ship hit command', () => {
	const SHIPS = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer'];

	let randomNumber = Math.floor(Math.random() * 4);
	let randomShip = Ship(SHIPS[randomNumber]);

	test('When ship is hit once, number of hits will be 1', () => {
		randomShip.hit();
		
		expect(randomShip.hits()).toEqual(1);
	});

	test("When a ship is hit the same number of times as it's length, it is sunk", () => {
		for (let i = 1; i <= randomShip.length - 1; i++) {
			randomShip.hit();
		}

		expect(randomShip.isSunk()).toBeTruthy();
	});
});
