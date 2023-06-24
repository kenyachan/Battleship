const Ship = require('../ship');
const Coordinates = require('../coordinates');
jest.mock('../coordinates');

describe('Check ship lengths', () => {	
	describe('Destroyer', () => {
		let destroyer = new Ship('Destroyer');

		test('Destroyer has length of 2', () => {
			expect(destroyer.type).toEqual('Destroyer');
			expect(destroyer.length).toEqual(2);
		});
	});

	describe('Cruiser', () => {
		let cruiser = new Ship('Cruiser');

		test('Cruiser has length of 3', () => {
			expect(cruiser.type).toEqual('Cruiser');
			expect(cruiser.length).toEqual(3);
		});
	});

	describe('Submarine', () => {
		let sub = new Ship('Submarine');

		test('Submarine has a length of 3', () => {
			expect(sub.type).toEqual('Submarine');
			expect(sub.length).toEqual(3);
		});	
	});

	describe('Battleship', () => {
		let battleship = new Ship('Battleship');
			
		test('Battleship has a length of 4', () => {
			expect(battleship.type).toEqual('Battleship');
			expect(battleship.length).toEqual(4);
		});
	});

	describe('Carrier', () => {
		let carrier = new Ship('Carrier');

		test('Carrier has a length of 5', () => {
			expect(carrier.type).toEqual('Carrier');
			expect(carrier.length).toEqual(5);
		});
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

describe('Testing ship hit command', () => {
	test("The ship will keep track of the number of times it has been hit", () => {
		let numberOfHits = Math.floor(Math.random() * (randomShip.length));

		while(randomShip.hits() < numberOfHits)
			randomShip.hit();

		expect(randomShip.hits()).toEqual(numberOfHits);
	});

	test("A ship hit the same number of times as it's length will be sunk", () => {
		for (let i = 0; i < randomShip.length; i++)
			randomShip.hit();

		expect(randomShip.hits()).toEqual(randomShip.length);
		expect(randomShip.isSunk()).toEqual(true);
	});
});

describe('Testing Coordinates', () => {
	test('Ship coordinates are an array of type Coordinates', () => {
		expect(randomShip.coordinates().every(coordinate => 
			coordinate instanceof Coordinates)
		).toEqual(true);
	});

	test('Ship coordinates are for the length of the ship', () => {
		expect(randomShip.coordinates().length).toEqual(randomShip.length);
	});
});
