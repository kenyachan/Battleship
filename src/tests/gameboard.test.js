const Gameboard = require('../gameboard');
const Coordinates = require('../coordinates');
const Ship = require('../ship');

jest.mock('../coordinates', () => {
	return jest.fn().mockImplementation((x, y) => {
		return {
			'x': x,
			'y': y,
			'equals': jest.fn(coordinates => coordinates.x === x && coordinates.y === y)
		};
	})
});

jest.mock('../ship');

describe('Gamboard Test', () => {
	let board;
	let ship;

	beforeEach(() => {
		board = new Gameboard(Coordinates);
		ship = new Ship();
	});
	
	describe('Ship placement', () => {
		test('A ship can be placed on the board', () => {
			let position = [
				new Coordinates(0, 0), new Coordinates(1, 0), new Coordinates(2, 0)
			]

			expect(board.placeShip(ship, position)).toBeTruthy();
			expect(board.getShips())
				.toHaveLength(1);
			expect(board.getSquares()
				.find(square => 
					square.coordinates.equals(new Coordinates(0, 0))
				).ship
			)
				.toBeTruthy();
		});

		test('A ship cannot be placed beyond the boards limits', () => {
			let position = [
				new Coordinates(1337, 9000), new Coordinates(1337, 9001)
			]
			
			expect(board.placeShip(ship, position)).toBeFalsy();
			expect(board.getShips()).toHaveLength(0);
		});

		test('A ship cannot be placed and extend beyond the boards limits', () => {
			let position = [
				new Coordinates(9, 9), new Coordinates(10, 9)
			]

			expect(board.placeShip(ship, position)).toBeFalsy();
			expect(board.getShips()).toHaveLength(0);
		});

		test('A ship cannot overlap placement with another ship', () => {
			let firstPosition = [
				new Coordinates(4, 5), new Coordinates(5, 5), new Coordinates(6, 5)
			]

			expect(board.placeShip(ship, firstPosition)).toBeTruthy();
			expect(board.getShips()).toHaveLength(1);

			let secondPosition = [
				new Coordinates(5, 4), new Coordinates(5, 5), new Coordinates(5, 6)
			]

			expect(board.placeShip(ship, secondPosition)).toBeFalsy();
			expect(board.getShips()).toHaveLength(1);
		});
	});

	describe('Gameboard attack', () => {
		beforeEach(() => {
			board.placeShip(ship, [
				new Coordinates(0, 0), new Coordinates(1, 0), new Coordinates(2, 0)
			]);
		});

		test('Gameboard cannot receive attack where previous attack has occured', () => {
			let attackCoordinates = new Coordinates(1, 1);

			board.receiveAttack(attackCoordinates);
			expect(board.getSquares().filter(square => square.shotReceived)).toHaveLength(1);
			
			board.receiveAttack(attackCoordinates);
			expect(board.getSquares().filter(square => square.shotReceived)).toHaveLength(1);
		});

		test('Gameboard cannot receive attack out of board limits', () => {
			let attackCoordinates = new Coordinates(1337, 9001);
			
			expect(board.receiveAttack(attackCoordinates))
				.toBeFalsy();
		});

		test('Gameboard will record a hit against the ship', () => {
			let attackCoordinates = new Coordinates(1, 0);

			expect(board.receiveAttack(attackCoordinates))
				.toBeTruthy();

			expect(board.getSquares()
				.find(square => square.coordinates.equals(attackCoordinates))
				.shotReceived
			)
				.toBeTruthy();
		});

		test('Gameboard will keep track of all missed attacks', () => {
			for (let y = 0; y < 5; y++)
				board.receiveAttack(new Coordinates(1, y));

			expect(board.getSquares().filter(square => square.shotReceived && !square.ship))
				.toHaveLength(4);
		});
	});
	
	describe('Gameboard allShipsSunk', () => {
		test('Gameboard will report when all ships have been sunk', () => {
			Ship.mockImplementationOnce(() => {
				return {
					'isSunk' : jest.fn(() => true)
				};
			});		

			board.placeShip(new Ship(), [
				new Coordinates(0, 0), new Coordinates(1, 0), new Coordinates(2, 0)
			]);	

			expect(board.allShipsSunk())
				.toEqual(true);
		});
	});
});
