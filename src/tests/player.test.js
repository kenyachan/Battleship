const Player = require('../player');
const Gameboard = require('../gameboard');

jest.mock('../gameboard');

describe('Test constructor', () => {	
	test('Player will be created with a blank gameboard', () => {
		let friendlyWaters = new Gameboard();
		let player = new Player(friendlyWaters);

		expect(player.board instanceof Gameboard).toEqual(true);
		expect(player.board).toBe(friendlyWaters);
	});
});

describe('Test shoot', () => {
	let player;
	let opponentBoard;
	let targetCoordinates;

	beforeEach(() => {
		player = new Player();
		
		opponentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return {
					shotReceived: true
				};
			})
		};

		targetCoordinates = 11;
	});

	test('Shoot will call shotReceived on the opponents board with the given coordinates', () => {
		player.shoot(opponentBoard, targetCoordinates);

		expect(opponentBoard.receiveAttack).toHaveBeenCalledWith(targetCoordinates);
	});

	test('Shooting the opponents board will return the square being shot', () => {
		let targetSquare = player.shoot(opponentBoard, targetCoordinates);

		expect(typeof targetSquare).toBe('object');
	});

	test('Shooting the same coordinates twice will throw an error', ()=> {
		let firstShot = player.shoot(opponentBoard, targetCoordinates);
		
		expect(() => player.shoot(opponentBoard, targetCoordinates)).toThrow();
	});
});

describe('Test shotHistory', () => {
	let player;
	let opponentBoard;
	let targetCoordinates;

	beforeEach(() => {
		player = new Player();
		
		opponentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return {
					shotReceived: true
				};
			})
		};

		targetCoordinates = 11;
	});

	test('Shot coordinates will be recorded in the shotHistory', () => {
		player.shoot(opponentBoard, targetCoordinates);

		expect(player.shotHistory.includes(targetCoordinates)).toBe(true);
	});
});

