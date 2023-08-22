const Gameboard = require('../classes/gameboard');
const Ship = require('../classes/ship');

jest.mock('../classes/ship');

describe('Gamboard Unit Tests', () => {
	let board;
	let ship;

	beforeEach(() => {
		board = new Gameboard();
		ship = new Ship();
	});

	describe('Board creation', () => {
		test('Gameboard of size 10x10 will have 100 squares', () => {
			expect(board.squares).toHaveLength(100);
		});
	});
	
	describe('Ship placement', () => {
		test('A ship can be placed on the board', () => {
			let position = [0, 1 ,2];

			expect(board.placeShip(ship, position)).toBeTruthy();
			expect(board.getShips()).toHaveLength(1);
			expect(board.squares.filter(square => square.ship)).toHaveLength(3);
		});

		test('A ship cannot be placed beyond the boards limits', () => {
			let position = [1337, 9000];
			
			expect(board.placeShip(ship, position)).toBeFalsy();
			expect(board.getShips()).toHaveLength(0);
		});

		test('A ship cannot be placed and extend beyond the boards limits', () => {
			let position = [99, 100]

			expect(board.placeShip(ship, position)).toBeFalsy();
			expect(board.getShips()).toHaveLength(0);
		});

		test('A ship cannot overlap placement with another ship', () => {
			let firstPosition = [44, 45, 46];

			expect(board.placeShip(ship, firstPosition)).toBeTruthy();
			expect(board.getShips()).toHaveLength(1);

			let secondPosition = [35, 45, 55];

			expect(board.placeShip(ship, secondPosition)).toBeFalsy();
			expect(board.getShips()).toHaveLength(1);
		});
	});

	describe('Gameboard attack', () => {
		beforeEach(() => {
			board.placeShip(ship, [0, 1, 2]);
		});

		test('Gameboard cannot receive attack where previous attack has occured', () => {
			let targetSquare = 11;

			board.receiveAttack(targetSquare);
			expect(board.squares.filter(square => square.shotReceived)).toHaveLength(1);
			
			board.receiveAttack(targetSquare);
			expect(board.squares.filter(square => square.shotReceived)).toHaveLength(1);
		});

		test('Gameboard cannot receive attack out of board limits', () => {
			let targetSquare = 1337;
			
			expect(board.receiveAttack(targetSquare))
				.toBeFalsy();
		});

		test('Gameboard will record a hit against the ship', () => {
			let targetSquare = 1;

			expect(board.receiveAttack(targetSquare)).toBeTruthy();
			expect(board.squares[targetSquare].shotReceived).toBeTruthy();
		});

		test('Gameboard will keep track of all missed attacks', () => {
			for (let i = 0; i < 5; i++)
				board.receiveAttack(i + 2);

			expect(board.squares.filter(square => square.shotReceived && !square.ship)).toHaveLength(4);
		});
	});
	
	describe('Gameboard allShipsSunk', () => {
		test('Gameboard will report true if all ships have been sunk', () => {
			Ship.mockImplementationOnce(() => {
				return {
					'isSunk' : jest.fn(() => true)
				};
			});

			board.placeShip(new Ship(), [0, 1, 2]);	

			expect(board.allShipsSunk()).toEqual(true);
		});

		test('Gameboard will report false if not all ships have been sunk', () => {
			Ship.mockImplementationOnce(() => {
				return {
					isSunk: jest.fn(() => false)
				};
			});

			board.placeShip(new Ship(), [0, 1, 2]);

			expect(board.allShipsSunk()).toEqual(false);
		});
	});
});

