const Bot = require('../bot');
const Player = require('../player');

jest.mock('../player');

function createOpponentBoard() {
	let opponentBoard = {
		squares : []
	};

	for (let i = 1; i <= 100; i++) {
		let square = {
			coordinates : i,
			ship : undefined,
			shotReceived : false
		}

		opponentBoard.squares.push(square);
	}

	return opponentBoard;
}

let opponentBoard;
let player;
let bot;

beforeEach(() => {
	opponentBoard = createOpponentBoard();
	player = new Player();
	bot = new Bot(player, opponentBoard);
});

describe('A board which has taken no attacks should have 100 available shots', () => {
	test('Available shots will have length of 100', () => {
		let availableShots = bot.getAvailableShots();

		expect(availableShots).toHaveLength(100);
	});
});

describe('A board which has taken one shot at coordinates 6, will have 99 available shots', () => {
	test('Square with coordinates of 6 will not be in available shots', () => {
		opponentBoard.squares[5].shotReceived = true;

		let availableShots = bot.getAvailableShots();
		let invalidSquare = availableShots.find(square => square.coordinates === 6);

		expect(invalidSquare).toBeUndefined();
	});

	test('Available shots will have length of 99', () => {
		opponentBoard.squares[5].shotReceived = true;

		let availableShots = bot.getAvailableShots();

		expect(availableShots).toHaveLength(99);
	});
});

describe('The play function will return the coordinates that it shoots', () => {
	test('Player will shoot the coordinates that the play function returns', () => {
		let targetCoordinates = bot.play();

		expect(player.shoot).toHaveBeenCalledWith(targetCoordinates);
	});
});

