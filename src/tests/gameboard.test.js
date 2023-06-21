const Gameboard = require('../gameboard');

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

describe('Game board initialisation', () => {
	let board;

	beforeEach(() => {
		board = new Gameboard();
	});

	test('Create a new game board', () => {
		expect(board instanceof Gameboard).toEqual(true);
	});
});

describe('Check game board size', () => {
	let board;

	beforeEach(() => {
		board = new Gameboard();
	});

	test('Height should be 10', () => {
		expect(board.height).toEqual(10);
	});

	test('Width should be 10', () => {
		expect(board.width).toEqual(10);
	});
});

