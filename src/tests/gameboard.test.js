const Gameboard = require('../gameboard');
const Coordinates = require('../coordinates');
const Ship = require('../ship');
//jest.mock('../coordinates');
//jest.mock('../ship');

let board;

beforeEach(() => {
	board = new Gameboard(Coordinates);
});

describe('Ship placement', () => {
	test('Ship cannot be placed beyond the boards limits', () => {
		let ship = new Ship(Coordinates);
		ship.type = 'Carrier';

		let coordinates = new Coordinates(1337, 9001);
		let direction = 'horizontal';

		expect(() => board.placeShip(ship, coordinates, direction)).toThrow();
	});

	test('A ship cannot be placed to extend beyond the boards limits', () => {
		let ship = new Ship(Coordinates);
		ship.type = 'Carrier';

		let coordinates = new Coordinates(8, 8);
		let direction = 'vertical';

		expect(() => board.placeShip(ship, coordinates, direction)).toThrow();
	});

	test('A ship can be placed and extend within the boards limits', () => {
		let ship = new Ship(Coordinates);
		ship.type = 'Carrier';

		let coordinates = new Coordinates(1, 1);
		let direction = 'horizontal';
		
		expect(() => board.placeShip(ship, coordinates, direction)).not.toThrow();
		expect(board.getShips().length).toEqual(1);
	});

	test('Ship cannot overlap with placement of another ship', () => {
		let ship_1 = new Ship(Coordinates);
		ship_1.type = 'Carrier';

		let coordinates_1 = new Coordinates(3, 3);
		let direction_1 = 'horizontal';

		let ship_2 = new Ship(Coordinates);
		ship_2.type = 'Carrier';
		
		let coordinates_2 = new Coordinates(4, 1);
		let direction_2 = 'vertical';

		expect(() => board.placeShip(ship_1, coordinates_1, direction_1)).not.toThrow();
		expect(board.getShips().length).toEqual(1);

		expect(() => board.placeShip(ship_2, coordinates_2, direction_2)).toThrow();
	});
});

describe('Gameboard attack', () => {
	let ship;

	beforeEach(() => {
		ship = new Ship(Coordinates);
		ship.type = 'Carrier';

		let coordinates = new Coordinates(1, 1);
		let direction = 'horizontal';

		board.placeShip(ship, coordinates, direction);
	});

	test('Gameboard cannot receive attack where previous attack has occured', () => {
		let attackCoordinates = new Coordinates(1, 1);

		expect(board.receiveAttack(attackCoordinates)).toEqual(true);
		expect(board.receiveAttack(attackCoordinates)).toBeNull();
	});

	test('Gameboard cannot receive attack out of board limits', () => {
		let attackCoordinates = new Coordinates(1337, 9001);
		
		expect(board.receiveAttack(attackCoordinates)).toBeNull();
	});

	test('Gameboard will report when all ships have been sunk', () => {
		let shipCoordinates = ship.getCoordinates();

		expect(board.allShipsSunk()).toEqual(false);
		shipCoordinates.forEach(coordinate => board.receiveAttack(coordinate));
		expect(board.allShipsSunk()).toEqual(true);
	});

	test('Gameboard will keep track of all missed attacks', () => {
		let missedAttacks = [];

		for (let y = 0; y < 5; y++) {
			let attackCoordinates = new Coordinates(1, y);
			
			if (!board.receiveAttack(attackCoordinates))
				missedAttacks.push(attackCoordinates);
		}

		let expectedHitCoordinates = new Coordinates(1, 1);

		expect(missedAttacks.length).toEqual(4);
		expect(ship.getHits().find(coordinates => coordinates.equals(expectedHitCoordinates)).toString()).
			toEqual(expectedHitCoordinates.toString());

		expect(missedAttacks.every(coordinates => board.getMissedAttacks().includes(coordinates))).toEqual(true);
	});
});
