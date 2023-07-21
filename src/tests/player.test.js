const Player = require('../player');
const Coordinates = require('../coordinates');
const Gamebaord = require('../gameboard');

jest.mock('../coordinates', () => {
	return jest.fn().mockImplementation((x, y) => {
		return {
			'x': x,
			'y': y,
			'equals': jest.fn(coordinates => coordinates.x === x && coordinates.y === y)
		};
	})
});

describe('Player Tests', () => {
	const playerName = 'Jason Bourne';
	let player;
	let opponentBoard;
	let attackCoordinates;

	beforeEach(() => {
		player = new Player(playerName);

		oppenentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return true;
			})
		};

		attackCoordinates = new Coordinates(1, 1);
	});

	test('Player will be created with a name', () => {
		expect(player.name).toEqual(playerName);
	});

	test('Player can shoot at opponents gameboard', () => {
		expect(player.shoot(attackCoordinates, oppenentBoard)).toBeTruthy();
		expect(oppenentBoard.receiveAttack.mock.calls).toHaveLength(1);
		expect(player.getShotsFired()).toHaveLength(1);
		expect(player.getShotsFired()).toEqual([attackCoordinates]);
	});

	test('Player cannot shoot the same coordinates twice', () => {
		expect(player.getShotsFired()).toHaveLength(0);

		expect(player.shoot(attackCoordinates, oppenentBoard)).toBeTruthy();
		expect(player.getShotsFired()).toHaveLength(1);
		expect(player.getShotsFired()).toEqual([attackCoordinates]);

		expect(player.shoot(attackCoordinates, oppenentBoard)).toBeFalsy();
		expect(player.getShotsFired()).toHaveLength(1);
		expect(player.getShotsFired()).toEqual([attackCoordinates]);
	});
});

describe('Computer Test', () => {
	const playerName = 'Computer';
	let player;
	let oppenentboard;
	
	beforeEach(() => {
		player = new Player(playerName);

		oppenentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return true;
			})
		};
	});

	test('Computer will take a random shot at the oppenents board', () => {
		expect(player.computerShoot(new Coordinates(0,0), oppenentBoard)).toBeTruthy();
		expect(oppenentBoard.receiveAttack.mock.calls).toHaveLength(1);
		expect(player.getShotsFired()).toHaveLength(1);
	});

});


