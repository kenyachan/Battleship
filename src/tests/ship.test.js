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

describe('Test ship hit command', () => {
	let ship;

	beforeEach(() => {
		ship = new Ship('carrier');
	});

	test('The ship will keep track of the number of times it has been hit', () => {
		ship.hit();
		expect(ship.getHits()).toEqual(1);
		ship.hit();
		expect(ship.getHits()).toEqual(2);
	});

	test('A ship hit the same number of times as its length will report true for isSunk()', () => {
		for (let i = 0; i < ship.length; i++)
			ship.hit();

		expect(ship.getHits()).toEqual(ship.length);
		expect(ship.isSunk()).toEqual(true);
	});
});

