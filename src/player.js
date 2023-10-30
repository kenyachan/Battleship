class Player {
	board;
	shotHistory = [];

	constructor(board) {
		this.board = board;
	}

	shoot(opponentBoard, targetCoordinates) {
		if (this.shotHistory.find(square => square === targetCoordinates))
			throw new error(`A shot has already been taken at ${targetCoordinates}`);

		this.shotHistory.push(targetCoordinates);

		let shot = opponentBoard.receiveAttack(targetCoordinates);

		return shot;
	}
}

module.exports = Player;
