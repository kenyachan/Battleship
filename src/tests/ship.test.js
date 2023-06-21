const Ship = require('../ship');

const Coordinates = require('../coordinates');
jest.mock('../coordinates');

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

const SHIPS = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer'];

let randomNumber;
let randomShip;
let direction

beforeEach(() => {
	randomNumber = Math.floor(Math.random() * 4);
	direction = randomNumber % 2 === 0 ? 'horizontal' : 'vertical';
	randomShip = new Ship(SHIPS[randomNumber], new Coordinates(1, 1), direction, Coordinates);
});

describe('Testing ship isSunk query', () => {
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
	test("Ship hits will reflect the number of hits it received", () => {
		let randomNumber_shipHits = Math.floor(Math.random() * randomShip.length);

		for(let i = 0; i < randomNumber_shipHits; i++)
			randomShip.hit();
		
		expect(randomShip.hits()).toEqual(randomNumber_shipHits);
	});
});

describe('Testing Coordinates', () => {
	test('Ship coordinates are an array of coordinates', () => {
		randomShip.coordinates().forEach(coordinates => {
			expect(coordinates instanceof Coordinates).toEqual(true);
		});

		expect(randomShip.coordinates().length).toEqual(randomShip.length);
	});
});
