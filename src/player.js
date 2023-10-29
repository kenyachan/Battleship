class Player {
	board;
	shotHistory = [];

	constructor(board) {
		this.board = board;
	}

	shoot(opponentBoard, targetSquare) {
		if (this.shotHistory.find(square => square === targetSquare))
			throw new error(`A shot has already been taken at ${targetSquare}`);

		this.shotHistory.push(targetSquare);

		let shot = opponentBoard.receiveAttack(targetSquare);

		return shot;
	}
}

module.exports = Player;
