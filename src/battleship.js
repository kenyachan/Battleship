const DryDock = require('./ship');
const Ship = DryDock.Ship;
const ShipTypes = DryDock.ShipTypes;
const Player = require('./player');
const Gameboard = require('./gameboard');
const Bot = require('./bot');

class Battleship {
	player1;
	player2;
	bot;

	constructor() {
		this.player1 = new Player();
		this.player2 = new Player();
		this.bot = new Bot(this.player2, this.player1.board);
	}

	playRound() {
		// get active player attack coordinates

		// attack opponent board

		// calculate win
		
		// change active player
	}

	
}

module.exports = Battleship;

