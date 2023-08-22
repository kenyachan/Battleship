const Player = require('../classes/player');
const Gameboard = require('../classes/gameboard');

jest.mock('../classes/gameboard');

describe('Test Constructor', () => {	
	test('Player will be created with a blank gameboard', () => {
		let friendlyWaters = new Gameboard();
		let player = new Player(friendlyWaters);

		expect(player.getBoard()).toBe(friendlyWaters);
	});
});

describe('Test player attacking oppenent gameboard', () => {
	let player;
	let opponentBoard;
	let targetSquare;

	beforeEach(() => {
		player = new Player();
		
		opponentBoard = {
			receiveAttack: jest.fn(coordinates => {
				return true;
			})
		};

		targetSquare = 11;
	});

	test('Player can shoot at opponents gameboard', () => {
		expect(player.shoot(targetSquare, opponentBoard)).toBeTruthy();
		expect(opponentBoard.receiveAttack.mock.calls).toHaveLength(1);
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([targetSquare]);
	});

	test('Player cannot shoot the same coordinates twice', () => {
		expect(player.getShotHistory()).toHaveLength(0);

		expect(player.shoot(targetSquare, opponentBoard)).toBeTruthy();
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([targetSquare]);

		expect(player.shoot(targetSquare, opponentBoard)).toBeFalsy();
		expect(player.getShotHistory()).toHaveLength(1);
		expect(player.getShotHistory()).toEqual([targetSquare]);
	});
});

