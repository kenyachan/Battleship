class Player {
	#board;
	#shotHistory = [];

	constructor(board) {
		//this.name = name;
		this.#board = board;
	}

	getBoard() {
		return this.#board;
	}

	shoot(attackCoordinates, opponentBoard) {
		if (this.#shotHistory.find(coordinates => coordinates.equals(attackCoordinates)))
			return false;

		this.#shotHistory.push(attackCoordinates);
		opponentBoard.receiveAttack(attackCoordinates);

		return true;
	}

	getShotHistory() {
		return this.#shotHistory;
	}
}

module.exports = Player;
