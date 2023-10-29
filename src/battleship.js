const Ship = require('./ship');
const Player = require('./player');
const Gameboard = require('./gameboard');

class Battleship1 {
	activePlayer;
	opponent;

	/**
	 * @constructor
	 * @param {Player} player1 - First player.
	 * @param {Player} player2 - Second player or computer player.
	 */
	constructor(player1, player2) {
		this.activePlayer = player1;
		this.opponent = player2;
	}

	playRound() {
		// get active player attack coordinates
		let attackCoordinates;


		// attack opponent board
		this.activePlayer.shoot(this.opponent.board, attackCoordinates);

		// calculate win
		this.calculateWin();
		
		// change active player
		this.changeActivePlayer();
	}

	calculateWin() {
		return activePlayer.board.allShipsSunk();
	}

	changeActivePlayer() {
		let player = this.activePlayer;
		this.activePlayer = this.opponent;
		this.opponent = player;
	}
}

class Battleship {
	player1;
	player2;
	activePlayer;

	constructor() {
		this.player1 = new Player(this.#createMockBoard());
		this.player2 = new Player(this.#createMockBoard());

		this.activePlayer = this.player1;
	}

	// placeholder for place ships
	#createMockBoard() {
		let friendlyBoard = new Gameboard();

		let destroyer = new Ship('destroyer');
		let destroyerPosition = [0, 1];

		friendlyBoard.placeShip(destroyer, destroyerPosition);

		let cruiser = new Ship('cruiser');
		let cruiserPosition = [10, 11, 12];
		friendlyBoard.placeShip(cruiser, cruiserPosition);

		let submarine = new Ship('submarine');
		let submarinePosition = [20, 21, 22];
		friendlyBoard.placeShip(submarine, submarinePosition);

		let battleship = new Ship('battleship');
		let battleshipPosition = [30, 31, 32, 33];
		friendlyBoard.placeShip(battleship, battleshipPosition);

		let carrier = new Ship('carrier');
		let carrierPosition = [40, 41, 42, 43, 44];
		friendlyBoard.placeShip(carrier, carrierPosition);

		return friendlyBoard;
	}

	play(coordinates) {
		let activePlayer = this.activePlayer;
		let opponent = activePlayer === this.player1 ? this.player2 : this.player1;

		activePlayer.shoot(opponent.board, coordinates);

		this.#changeActivePlayer();

		return opponent.board.squares[coordinates];

		if (opponent.board.squares[coordinates].shotReceived &&
			!opponent.board.squares[coordinates].ship)
			return {
				player: activePlayer,
				coordinates: coordinates
			};
	}

	#changeActivePlayer() {
		this.activePlayer = this.activePlayer === this.player1 ? this.player2 : this.player1;
	}

	checkWin() {
		if (this.player1.board.allShipsSunk())
			return this.player2;

		if (this.player2.board.allShipsSunk())
			return this.player1;

		return null;	
	}

}

module.exports = Battleship;

