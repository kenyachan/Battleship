const Ship = require('../ship');

describe('Check ship lengths', () => {	
	test('Destroyer has length of 2', () => {
		let ship = new Ship('destroyer');

		expect(ship.type).toEqual('destroyer');
		expect(ship.length).toEqual(2);
	});

	test('Cruiser has length of 3', () => {
		let ship = new Ship('cruiser');

		expect(ship.type).toEqual('cruiser');
		expect(ship.length).toEqual(3);
	});

	test('Submarine has a length of 3', () => {
		let ship = new Ship ('submarine');

		expect(ship.type).toEqual('submarine');
		expect(ship.length).toEqual(3);
	});	

	test('Battleship has a length of 4', () => {
		let ship = new Ship ('battleship');
		
		expect(ship.type).toEqual('battleship');
		expect(ship.length).toEqual(4);
	});

	test('Carrier has a length of 5', () => {
		let ship = new Ship ('carrier');

		expect(ship.type).toEqual('carrier');
		expect(ship.length).toEqual(5);
	});
});

describe('The ship will keep track of the number of times it has been hit', () => {
	let ship;

	beforeEach(() => {
		ship = new Ship('destroyer');
	});

	test('A destroyer with no hits will have a hit count of 0', () => {
		expect(ship.getHits()).toEqual(0);
	});

	test('A destroyer hit once will have a hit count of 1', () => {
		ship.hit();
		
		expect(ship.getHits()).toEqual(1);
	});

	test('A destroyer hit twice will have a hit count of 2', () => {
		ship.hit();
		ship.hit();

		expect(ship.getHits()).toEqual(2);
	});

	test('A destroyer hit three times will have a hit count of 2', () => {
		ship.hit();
		ship.hit();
		ship.hit();

		expect(ship.getHits()).toEqual(2);
	});
});

describe('A ship hit the same number of times as its length will report true for isSunk()', () => {
	let ship;

	beforeEach(() => {
		ship = new Ship('destroyer');
	});

	test('A destroyer with no hits will report false for isSunk()', ()=> {
		expect(ship.getHits()).toEqual(0);
		expect(ship.isSunk()).toEqual(false);
	});

	test('A destroyer hit once will report false for isSunk()', () => {
		ship.hit();

		expect(ship.getHits()).toEqual(1);
		expect(ship.isSunk()).toEqual(false);
	});

	test('A destroyer hit twice will report true for isSunk()', () => {
		ship.hit();
		ship.hit();

		expect(ship.getHits()).toEqual(2);
		expect(ship.isSunk()).toEqual(true);
	});
});

