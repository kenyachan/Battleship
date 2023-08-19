const Player = require('../player');
const Coordinates = require('../coordinates');
const Gameboard = require('../gameboard');

jest.mock('../coordinates', () => {
	return jest.fn().mockImplementation((x, y) => {
		return {
			'x': x,
			'y': y,
			'equals': jest.fn(coordinates => coordinates.x === x && coordinates.y === y)
		};
	})
});

jest.mock('../gameboard');

describe('Test Constructor', () => {	
	/*
	test('Player will be created with the name "Jason Bourne"', () => {
		let player = new Player('JSON Bourne');

		expect(player.name).toEqual('JSON Bourne');
	});
	*/

	test('Player will be created with a blank gameboard', () => {
		let friendlyWaters = new Gameboard();
		//let player = new Player('JSON Bourne', friendlyWaters);
		let player = new Player(friendlyWaters);

		expect(player.getBoard()).toBe(friendlyWaters);
	});
});

describe('Test player attacking oppenent gameboard', () => {
	//const playerName = 'JSON Bourne';
	let player;
	let opponentBoard;
	let attackCoordinates;

	beforeEach(() => {
		//player = new Player(playerName);
		player = new Player();
		
		opponentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return true;
			})
		};

		attackCoordinates = new Coordinates(1, 1);
	});

	test('Player can shoot at opponents gameboard', () => {
		expect(player.shoot(attackCoordinates, opponentBoard)).toBeTruthy();
		expect(opponentBoard.receiveAttack.mock.calls).toHaveLength(1);
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([attackCoordinates]);
	});

	test('Player cannot shoot the same coordinates twice', () => {
		expect(player.getShotHistory()).toHaveLength(0);

		expect(player.shoot(attackCoordinates, opponentBoard)).toBeTruthy();
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([attackCoordinates]);

		expect(player.shoot(attackCoordinates, opponentBoard)).toBeFalsy();
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([attackCoordinates]);
	});
});

