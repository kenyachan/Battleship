const Gameboard = require('../gameboard');
const Ship = require('../ship');

jest.mock('../ship');

describe('Gamboard Unit Tests', () => {
	let board;
	let ship;

	beforeEach(() => {
		board = new Gameboard();
		ship = new Ship();

		Ship.mockClear();
	});

	describe('Gameboard construction', () => {
		test('Gamboard will be created of size 100', () => {
			let gb = new Gameboard();

			expect(gb.squares).toHaveLength(100);
		});

		test('Gameboard will be created with size of 81', () => {
			let gb = new Gameboard(9);

			expect(gb.squares).toHaveLength(81);
		});

		test('The first square will have coordinates of 1', () => {
			let gb = new Gameboard();

			expect(gb.squares[0].coordinates).toBe(1);
		});
	});
	
	describe('Ship placement', () => {
		describe('A ship can be placed on the board', () => {
			test('Placing a ship at position [1, 2, 3] will be truthy', () => {
				let position = [1, 2 ,3];

				expect(board.placeShip(ship, position)).toBeTruthy();
				expect(board.ships).toHaveLength(1);
				expect(board.squares.filter(square => square.ship)).toHaveLength(3);
			});
		});

		describe('A ship cannot be placed beyond the boards limits', () => {
			test('Placing a ship at at position [1337, 9001] will be falsey', () => {
				let position = [1337, 9000];
				
				expect(board.placeShip(ship, position)).toBeFalsy();
				expect(board.ships).toHaveLength(0);
			});

			test('Placing a ship at position [99, 100] will be falsey', () => {
				let position = [100, 101]

				expect(board.placeShip(ship, position)).toBeFalsy();
				expect(board.ships).toHaveLength(0);
			});
		});

		describe('A ship cannot overlap placement with another ship', () => {
			test('Placing a ship at position [35, 45, 55] will return falsey', () => {
				let firstPosition = [44, 45, 46];

				expect(board.placeShip(ship, firstPosition)).toBeTruthy();
				expect(board.ships).toHaveLength(1);

				let secondPosition = [36, 46, 56];

				expect(board.placeShip(ship, secondPosition)).toBeFalsy();
				expect(board.ships).toHaveLength(1);
			});
		});
	});

	describe('Receive attack', () => {
		beforeEach(() => {
			board.placeShip(ship, [1, 2, 3]);
		});

		test('Receive Attack will return the square that has been attacked', () => {
			let targetCoordinates = 11;
			
			let targetSquare = board.receiveAttack(targetCoordinates);

			expect(typeof targetSquare).toEqual('object');
			expect(targetSquare.coordinates).toBe(targetCoordinates);
			expect(targetSquare.shotReceived).toBe(true);
		});

		test('Receive Attack will throw an error when the same square is attacked', () => {
			let targetSquare = 11;

			board.receiveAttack(11);
			expect(board.squares.filter(square => square.shotReceived)).toHaveLength(1);

			expect(() => board.receiveAttack(targetSquare)).toThrow();
		});

		test('Receive Attack will throw an error when attack is out of board limits', () => {
			let targetSquare = 1337;

			expect(() => board.receiveAttack(targetSquare)).toThrow();
		});	

		test('Receive Attack will record a hit against the ship', () => {
			let targetCoordinates = 1;

			let targetSquare = board.receiveAttack(targetCoordinates);

			expect(ship.hit).toHaveBeenCalled();
		});
	});
	
	describe('Check for all ships sunk', () => {
		test('allShipsSunk will report true if all ships have been sunk', () => {
			Ship.mockImplementationOnce(() => {
				return {
					'isSunk' : jest.fn(() => true)
				};
			});

			board.placeShip(new Ship(), [1, 2, 3]);	

			expect(board.allShipsSunk()).toEqual(true);
		});

		test('allShipsSunk will report false if all ships have not been sunk', () => {
			Ship.mockImplementationOnce(() => {
				return {
					isSunk: jest.fn(() => false)
				};
			});

			board.placeShip(new Ship(), [1, 2, 3]);

			expect(board.allShipsSunk()).toEqual(false);
		});
	});
});

