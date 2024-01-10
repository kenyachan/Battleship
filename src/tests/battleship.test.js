const Battleship = require('../battleship');
const Player = require('../player');
const Gameboard = require('../gameboard');
const Ship = require('../ship');
const Bot = require('../bot');

jest.mock('../player');
jest.mock('../gameboard');
jest.mock('../ship');
jest.mock('../bot');

let battleship;
let player1;
let player2;

beforeEach(() => {
	battleship = new Battleship();
});

describe('Starting a new game', () => {
	describe("A new game will create players", () => {
		test('New game will create a player1', () => {
			expect(battleship.player1).toBeInstanceOf(Player);	
		});
		
		test('New game will create a player2', () => {
			expect(battleship.player2).toBeInstanceOf(Player);
		});
	});

	describe('A Bot will be created to control player2', () => {
		test('New game will create a bot', () => {
			expect(battleship.bot).toBeInstanceOf(Bot);
		});

		test('Bot is created with arguments "battleship.player2" and "battleship.player1.board"', () => {
			expect(Bot).toHaveBeenCalledWith(battleship.player2, battleship.player1.board);
		});	
	});

	describe('Initialising players', () => {

	});
});

