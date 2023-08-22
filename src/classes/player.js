class Player {
	#board;
	#shotHistory = [];

	constructor(board) {
		this.#board = board;
	}

	getBoard() {
		return this.#board;
	}

	shoot(targetSquare, opponentBoard) {
		if (this.#shotHistory.find(square => square === targetSquare))
			return false;

		this.#shotHistory.push(targetSquare);
		opponentBoard.receiveAttack(targetSquare);

		return true;
	}

	getShotHistory() {
		return this.#shotHistory;
	}
}

module.exports = Player;
