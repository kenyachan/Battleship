class Player {
	#name;
	#shotsFired = [];

	constructor(name) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}

	shoot(attackCoordinates, opponentBoard) {
		if (this.#shotsFired.find(coordinates => coordinates.equals(attackCoordinates)))
			return false;

		this.#shotsFired.push(attackCoordinates);
		oppenentBoard.receiveAttack(attackCoordinates);

		return true;
	}

	getShotsFired() {
		return this.#shotsFired;
	}

	computerShoot(attackCoordinates, oppenentBoard) {
		do {
			attackCoordinates = this.#generateRandomCoordinates(attackCoordinates);
		} while (this.#shotsFired.find(coordinates => coordinates.equals(attackCoordinates)));

		return this.shoot(attackCoordinates, oppenentBoard);
	}
	
	#generateRandomCoordinates(attackCoordinates) {
		let randomX = Math.floor(Math.random() * 10);
		let randomY = Math.floor(Math.random() * 10);

		attackCoordinates.x = randomX;
		attackCoordinates.y = randomY;

		return attackCoordinates;
	}
}

module.exports = Player;
