const Gameboard = require('../gameboard');
const Coordinates = require('../coordinates');
//jest.mock('../coordinates');

/*
 * Game board should know where all the ships are
 * Game board should keep track of where all the missed shots are
 * Game board should keep track of where all the hit shots are
 * Game board should be able to report whether or not all ships have been sunk
 * Game board should be able to report whether a specific ship has been sunk?
 */

/*
 * Game board queries
 * ------------------
 * getShips() - returns array of ships with coordinates of ship
 * getReceivedAttacks() - returns an array coordinates for all attacks
 *
 */

/*
 * Game board commands
 * -------------------
 *  receiveAttack(coordinates)
 *  placeShip(ship, coordinates, direction)
 *
 */

let board;

beforeEach(() => {
	board = new Gameboard(Coordinates);
});

describe('Game board initialisation', () => {
	test('Create a new game board with a grid of size 10x10', () => {
		expect(board instanceof Gameboard).toEqual(true);
		expect(board.getGrid().length).toEqual(100);
	});
});

describe('Check game board grid', () => {
	test('Gameboard grid should be size 10x10', () => {
		expect(board.getGrid().length).toEqual(100);
	});

	test('Grid coordinates x has a minimum value of 0', () => {
		const coordinateMinValue = (coordinate) => coordinate.x >= 0;

		expect(board.getGrid().every(coordinateMinValue)).toEqual(true);
	});

	test('Grid coordinates y has a minimum value of 0', () => {
		const coordinateMinValue = (coordinate) => coordinate.y >= 0;

		expect(board.getGrid().every(coordinateMinValue)).toEqual(true);
	});

	test('Grid coordinates x has a maximum value of 9', () => {
		const coordinateMaxValue = (coordinate) => coordinate.x <= 9;

		expect(board.getGrid().every(coordinateMaxValue)).toEqual(true);
	});

	test('Grid coordinates y has a maximum value of 9', () => {
		const coordinateMaxValue = (coordinate) => coordinate.y <= 9;

		expect(board.getGrid().every(coordinateMaxValue)).toEqual(true);
	});
});

