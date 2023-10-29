class Bot {
	#player;
	#opponentBoard;

	constructor(player, opponentBoard) {
		this.#player = player;
		this.#opponentBoard = opponentBoard;
	}

	calculateTargetCoordinates(availableShots) {
		// do some fancy guess work
		let randomChoice = Math.floor(Math.random() * (availableShots.length - 0 + 1) + 0);

		return availableShots[randomChoice].coordinates;
	}

	play() {
		let availableShots = this.getAvailableShots();
		let targetCoordinates = this.calculateTargetCoordinates(availableShots);

		this.#player.shoot(targetCoordinates);

		return targetCoordinates;
	}

	getAvailableShots() {
		return this.#opponentBoard.squares.filter(square => square.shotReceived == false);
	}
}

module.exports = Bot;

