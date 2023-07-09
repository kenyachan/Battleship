const Ship = require('../ship');
const Coordinates = require('../coordinates');
//jest.mock('../coordinates');

let ship;
let randomShip;

beforeEach(() => {
	randomShip = createRandomShip();
	ship = new Ship(Coordinates);
});

function createRandomShip() {
	const SHIPS = ['Carrier', 'Battleship', 'Submarine', 'Cruiser', 'Destroyer'];

	let randomNumber = Math.floor(Math.random() * 4);
	let direction = randomNumber % 2 === 0 ? 'horizontal' : 'vertical';

	let ship = new Ship(Coordinates);
	ship.type = SHIPS[randomNumber];

	let coordinates = extendCoordinates(new Coordinates(1, 1), ship.length, direction);

	ship.setCoordinates(coordinates);

	return ship;
}

function extendCoordinates(initialCoordinates, length, direction) {
	let extendedCoordinates = [];

	for (let i = 0; i < length; i++) {
		let coordinates;

		if (direction === 'horizontal')
			coordinates = new Coordinates(initialCoordinates.x + i, initialCoordinates.y);

		if (direction === 'vertical')
			coordinates = new Coordinates(initialCoordinates.x, initialCoordinates.y + i);

		extendedCoordinates.push(coordinates);
	}

	return extendedCoordinates;
}

describe('Check ship lengths', () => {	
	test('Destroyer has length of 2', () => {
		ship.type = 'Destroyer';
		expect(ship.type).toEqual('Destroyer');
		expect(ship.length).toEqual(2);
	});

	test('Cruiser has length of 3', () => {
		ship.type = 'Cruiser';	
		expect(ship.type).toEqual('Cruiser');
		expect(ship.length).toEqual(3);
	});

	test('Submarine has a length of 3', () => {
		ship.type = 'Submarine';
		expect(ship.type).toEqual('Submarine');
		expect(ship.length).toEqual(3);
	});	

	test('Battleship has a length of 4', () => {
		ship.type = 'Battleship';
		expect(ship.type).toEqual('Battleship');
		expect(ship.length).toEqual(4);
	});

	test('Carrier has a length of 5', () => {
		ship.type = 'Carrier';
		expect(ship.type).toEqual('Carrier');
		expect(ship.length).toEqual(5);
	});
});

describe('Testing ship hit command', () => {
	test("The ship will keep track of where it has been hit", () => {
		let attackCoordinates = new Coordinates(1, 1);

		randomShip.hit(attackCoordinates);
		expect(randomShip.getHits()[0].equals(attackCoordinates)).toEqual(true);
	});

	test("The ship cannot be hit in the same place twice", () => {
		let attackCoordinates = new Coordinates(1, 1);

		randomShip.hit(attackCoordinates);
		expect(() => randomShip.hit(attackCoordinates)).toThrow();
	});

	test("A ship hit the same number of times as it's length will be sunk", () => {
		for (let i = 0; i < randomShip.length; i++)
			randomShip.hit(new Coordinates(i, 1));

		expect(randomShip.getHits().length).toEqual(randomShip.length);
		expect(randomShip.isSunk()).toEqual(true);
	});
});

describe('Testing Coordinates', () => {
	test('Ship coordinates are an array of type Coordinates', () => {
		expect(randomShip.getCoordinates().every(coordinate => 
			coordinate instanceof Coordinates)
		).toEqual(true);
	});

	test('Ship coordinates are for the length of the ship', () => {
		expect(randomShip.getCoordinates().length).toEqual(randomShip.length);
	});
});
