const Player = require('../player');
const Gameboard = require('../gameboard');

jest.mock('../gameboard');

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

describe("Creating a new player requires a gameboard", () => {
	test("Create a new player with a gameboard", () => {
		let board = new Gameboard();
		let player = new Player(board);

		expect(player.board instanceof Gameboard).toEqual(true);
		expect(player.board).toBe(board);
	});
});

describe("Shoot will attack the given board with given coordinates", () => {
	test("Shoot will call the receiveAttack function of the given board with targetCoordinates", () => {
		player.shoot(opponentBoard, targetCoordinates);

		expect(opponentBoard.receiveAttack).toHaveBeenCalledWith(targetCoordinates);
	});

	test("Shooting the opponents board will return the square being shot", () => {
		let targetSquare = player.shoot(opponentBoard, targetCoordinates);

		expect(typeof targetSquare).toBe('object');
	});
});

describe("A player cannot shoot the same coordinates more than once", () => {
	test("Shooting the same coordinates twice will throw an error", ()=> {
		let firstShot = player.shoot(opponentBoard, targetCoordinates);
		
		expect(() => player.shoot(opponentBoard, targetCoordinates)).toThrow();
	});
});

describe("A player will keep track of the shots taken", () => {
	test("targetCoordinates will be recorded in the player's shotHistory", () => {
		player.shoot(opponentBoard, targetCoordinates);

		expect(player.shotHistory.includes(targetCoordinates)).toBe(true);
	});
});

