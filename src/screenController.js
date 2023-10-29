class ScreenController {
	#battleship;
	#mainElement;
	#friendlyBoardElement;
	#enemyBoardElement;

	constructor(battleship) {// set dom elements to variables
		this.#battleship = battleship;
		this.#mainElement = document.querySelector('main');	

		const friendlyBoardDOM = this.#generateBoardDOM();
		friendlyBoardDOM.classList.add('player1', 'friendly');

		this.#mainElement.querySelector('#friendlyBoardPlaceholder').replaceWith(friendlyBoardDOM);
		this.#friendlyBoardElement = friendlyBoardDOM;

		const enemyBoardDOM = this.#generateBoardDOM();
		enemyBoardDOM.classList.add('player2', 'enemy');

		this.#mainElement.querySelector('#enemyBoardPlaceholder').replaceWith(enemyBoardDOM);
		this.#enemyBoardElement = enemyBoardDOM;

		this.#renderBoard(this.#battleship.player1);
		this.#renderBoard(this.#battleship.player2);
	}

	#generateBoardDOM() {
		const boardDOM = document.createElement('div');
		boardDOM.classList.add('gameboard');

		for (let i = 0; i < 100; i++) {
			let square = document.createElement('div');
			square.classList.add('square');
			square.dataset.coordinate = i;

			square.addEventListener('click', e => {
				if (e.target.closest('.enemy')) {
					this.#shoot(e.target);
				}
			});

			/* square index */
			square.textContent = i;

			boardDOM.appendChild(square);
		}

		return boardDOM;
	}

	#renderBoard(player) {
		let domSquares = player === this.#battleship.activePlayer ?
			this.#friendlyBoardElement.querySelectorAll('.square'):
			this.#enemyBoardElement.querySelectorAll('square');

		let squares = player.board.squares;

		for (let i = 0; i < 100; i++) {
			if (player === this.#battleship.activePlayer && squares[i].ship) {
				domSquares[i].classList.add('ship');
			}

			if (squares[i].shotReceived)
				domSquares[i].classList.add('shotReceived');
		}
	}

	#shoot(square) {
		this.#battleship.play(square.dataset.coordinate);
		square.classList.add('shotReceived');

		if (this.#battleship.activePlayer === this.#battleship.player1)
			this.#renderBoard(this.#battleship.player2);
		else
			this.#renderBoard(this.#battleship.player1);
	}
}

module.exports = ScreenController
