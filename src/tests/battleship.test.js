const Battleship = require('../battleship');
const Player = require('../player');
const Gameboard = require('../gameboard');
const Ship = require('../ship');


/*
let battleship;

beforeEach(() => {
	battleship = new Battleship();
});
*/

describe.skip('Test constructor function', () => {
	test('Player 1 will be created', () => {
		expect(battleship.player1).toBeInstanceOf(Player);
	});

	test('Player 2 will be created', () => {
		expect(battleship.player2).toBeInstanceOf(Player);
	});

	test('Game will keep track of the active player', () => {
		expect(battleship.activePlayer).toBeInstanceOf(Player);
	});

	test('Player 1 will be the first active player', () => {
		expect(battleship.activePlayer).toBe(battleship.player1);
	});
});

describe.skip('Test play function', () => {
	describe('Test alternating play function', () => {
		let game = new Battleship();

		test('Player 2 will be the active player after player1 plays', () => {
			game.play(8);

			expect(game.activePlayer).toBe(game.player2);
		});

		test('Game will alternate play', () => {
			game.play(9);

			expect(game.activePlayer).toBe(game.player1);
		});
	});

	test('play function will return square it attacks', () => {
		let attackCoordinates = 9;

		let attackedSquare = {
			ship : undefined,
			shotReceived : true
		}

		expect(battleship.play(attackCoordinates)).toEqual(attackedSquare);
	});
});

describe.skip('Test checkWin function', () => {
	test('checkWin will return null if all ships have not been sunk', () => {
		expect(battleship.player1.board.allShipsSunk()).toEqual(false);
		expect(battleship.player2.board.allShipsSunk()).toEqual(false);
		expect(battleship.checkWin()).toBeNull();
	});

	test('checkWin will return player1 as winner as all of player2 ships have been sunk', () => {
		let player2Ships = battleship.player2.board.ships;

		player2Ships.forEach(ship => {
			for (let i = 0; i < ship.length; i++)
				ship.hit();
		});

		expect(battleship.checkWin()).toEqual(battleship.player1);
	});
});

describe('Test playRound function', () => {
	test('Player 2 will be the active player after the first playRound call', () => {
		let player1 = new Player();
	});
});

function newMockBoard() {
	let board = new Gameboard();

	let destroyer = new Ship('destroyer');
	let destroyerPosition = [0, 1];
	board.placeShip(destroyer, destroyerPosition);

	let cruiser = new Ship('cruiser');
	let cruiserPosition = [10, 11, 12];
	board.placeShip(cruiser, cruiserPosition);

	let submarine = new Ship('submarine');
	let submarinePosition = [20, 21, 22];
	board.placeShip(submarine, submarinePosition);

	let battleship = new Ship('battleship');
	let battleshipPosition = [30, 31, 32, 33];
	board.placeShip(battleship, battleshipPosition);

	let carrier = new Ship('carrier');
	let carrierPosition = [40, 41, 42, 43, 44];
	board.placeShip(carrier, carrierPosition);

	return board;
}
