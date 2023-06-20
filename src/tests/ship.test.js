const Ship = require('../ship');

describe('Testing ship properties', () => {
	let destroyer = new Ship('Destroyer');
	let cruiser = new Ship('Cruiser');
	let sub = new Ship('Submarine');
	let battleship = new Ship('Battleship');
	let carrier = new Ship('Carrier');

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
	const SHIPS = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer'];

	let randomNumber;
	let randomShip;

	beforeEach(() => {
		randomNumber = Math.floor(Math.random() * 4);
		randomShip = new Ship(SHIPS[randomNumber]);

	});

	test("isSunk returns false is the ship hits is less than it's length", () => {
		expect(randomShip.hits()).toBeLessThan(randomShip.length);
		expect(randomShip.isSunk()).toBeFalsy();
	});

	test("isSunk returns true if the ship hits is equal to it's length", () => {
		while(randomShip.hits() <= randomShip.length)
			randomShip.hit();

		expect(randomShip.isSunk()).toBeTruthy;
	});
});

describe('Testing ship hit command', () => {
	const SHIPS = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer'];

	let randomNumber = Math.floor(Math.random() * 4);
	let randomShip = new Ship(SHIPS[randomNumber]);

	let randomNumber_shipHits = Math.floor(Math.random() * randomShip.length);

	test("Ship hits will reflect the number of hits it received", () => {
		for(let i = 0; i < randomNumber_shipHits; i++) {
			randomShip.hit();
		}
		
		expect(randomShip.hits()).toEqual(randomNumber_shipHits);
	});
});

