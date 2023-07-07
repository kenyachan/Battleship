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
	test('Gameboard should have a list of ships', () => {
		let ship = new Ship(Coordinates);
		ship.type = 'Carrier';

		let coordinates = new Coordinates(0,0);
		let direction = 'horizontal';

		let anotherShip = new Ship(Coordinates);
		ship.type = 'Battleship';

		let anotherCoordinates = new Coordinates(5,5);
		let anotherDirection = 'vertical';

		board.placeShip(ship, coordinates, direction);
		board.placeShip(anotherShip, anotherCoordinates, anotherDirection);

		expect(board.getShips().every(ship => ship instanceof Ship)).toEqual(true);
		expect(board.getShips().includes(ship)).toEqual(true);
		expect(board.getShips().includes(anotherShip)).toEqual(true);
	});

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

describe('Gameboard receive attack', () => {
	test.todo('Gameboard will have a list of previous attacks');

	test.todo('Gameboard cannot receive attack where previous attack has occured');

	test.todo('Gameboard cannot receive attack out of board limits');

	test.todo('A ship will record a hit when receiving attack is on its coordinates');
});
