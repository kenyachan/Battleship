const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

class ScreenController {
	#battleship;
	#mainElement;
	#friendlyBoardElement;
	#enemyBoardElement;

	#shipOrientation = HORIZONTAL;
	
	constructor(battleship) {// set dom elements to variables
		this.#battleship = battleship;
		this.#mainElement = document.querySelector('main');	

		this.#friendlyBoardElement = this.#initBoardDOM('friend');
		this.#enemyBoardElement = this.#initBoardDOM('foe');;

		this.#renderBoard(this.#battleship.player1.board, this.#friendlyBoardElement);
		this.#renderBoard(this.#battleship.player2.board, this.#enemyBoardElement);




		// init game
		//

		this.#enableShipPlacementHighlight(this.#friendlyBoardElement);

		let rotateBtn = this.#mainElement.querySelector('#rotateBtn');
		rotateBtn.addEventListener('click', e => this.toggleShipOrientation());

	}

	#initBoardDOM(friendOrFoe) {
		const boardDOM = this.#generateBoardDOM();
		let placeholder;
		let classList;

		switch(friendOrFoe) {
			case 'friend':
				placeholder = '#friendlyBoardPlaceholder';
				classList = 'friendly';
				break;
			
			case 'foe':
				placeholder = '#enemyBoardPlaceholder';
				classList = 'enemy';
				break;

			default:
				throw new Error('Unable to initialise board DOM');
		}

		boardDOM.classList.add(classList);
		this.#mainElement.querySelector(placeholder).replaceWith(boardDOM);
		
		return boardDOM;
	}

	#generateBoardDOM() {
		const boardDOM = document.createElement('div');
		boardDOM.classList.add('gameboard');

		for (let i = 0; i < 100; i++) {
			let square = document.createElement('div');
			square.classList.add('square');
			square.dataset.coordinate = i;

			/* square index */
			square.textContent = i;

			boardDOM.appendChild(square);
		}

		return boardDOM;
	}

	#renderBoard(board, domBoard) {
		if (board === undefined) return;

		let domSquares = domBoard.querySelectorAll('.square');

		console.log(board);
		
		board.squares.forEach(square => {
			let squareIndex = board.squares.indexOf(square);

			if (square.ship)
				domSquares[squareIndex].classList.add('ship');

			if (square.shotReceived)
				domSquares[squareIndex].classList.add('shotReceived');
		});
	}

	#initGame() {
		
	}

	toggleShipOrientation() {
		this.#shipOrientation = this.#shipOrientation === HORIZONTAL ? VERTICAL : HORIZONTAL; 

		console.log(`Ship orientation changed to "${this.#shipOrientation}"`);
	}

	// Ship placement
	#enableShipPlacementHighlight(boardDOM) {
		let board = boardDOM.querySelectorAll('.square');

		board.forEach(square => {
			square.addEventListener("mouseover", e => this.#toggleHighlight(e.target, 5));
			square.addEventListener("mouseout", e => this.#toggleHighlight(e.target, 5));
		});
	}

	#getHighlightCoordinates(targetCoordinate, length, orientation) {
		let coordinates = [];
		let rightHighlightLength = Math.floor(length / 2);
		let leftHighlightLength = length % 2 == 0 ? (length / 2) - 1 : Math.floor(length / 2);
		let firstCoord;
		
		if (orientation === HORIZONTAL)
			firstCoord = targetCoordinate - leftHighlightLength;
		else if (orientation === VERTICAL)
			firstCoord = targetCoordinate - (leftHighlightLength * 10);

		for (let i = 0; i < length; i++) {
			if (orientation === HORIZONTAL)
				coordinates.push(firstCoord + i);
			else if (orientation === VERTICAL)
				coordinates.push(firstCoord + (i * 10));
		}

		return coordinates;
	}

	#getRow(coordinate) {
		return Math.floor(coordinate/10) * 10;
	}

	#edgeShift(coords, targetCoordinates, orientation) {
		if (orientation === HORIZONTAL) {
			let rowIndex = this.#getRow(targetCoordinates);
			let outOfBoundsLeft = coords.filter(coord => this.#getRow(coord) < rowIndex);
			let outOfBoundsRight = coords.filter(coord => this.#getRow(coord) > rowIndex);

			if (outOfBoundsLeft.length > 0) {
			outOfBoundsLeft.forEach(coord => coords.splice(coords.indexOf(coord), 1));

			for (let i = 0; i < outOfBoundsLeft.length; i++)
				coords.push(coords[coords.length - 1] + 1);

			} else if (outOfBoundsRight.length > 0) {
				outOfBoundsRight.forEach(coord => coords.splice(coords.indexOf(coord), 1));

				for (let i = 0; i < outOfBoundsRight.length; i++)
					coords.unshift(coords[0] - 1);
			}
		} else if (orientation === VERTICAL) {
			let outOfBoundsTop = coords.filter(coord => coord < 0);
			let outOfBoundsBot = coords.filter(coord => coord > 99);

			if (outOfBoundsTop.length > 0) {
				outOfBoundsTop.forEach(coord => coords.splice(coords.indexOf(coord), 1));

				for (let i = 0; i < outOfBoundsTop.length; i++)
					coords.push(coords[coords.length - 1] + 10);
			} else if (outOfBoundsBot.length > 0) {
				outOfBoundsBot.forEach(coord => coords.splice(coords.indexOf(coord), 1));

				for(let i = 0; i < outOfBoundsBot.length; i++)
					coords.unshift(coords[0] - 10);
			}
		}

		return coords;
	}

	#toggleHighlight(target, length) {
		let targetCoordinate = parseInt(target.dataset.coordinate);
		let highlightCoordinates = this.#getHighlightCoordinates(targetCoordinate, length, this.#shipOrientation);
		
		// edgeShift/check outOfBounds cases
		highlightCoordinates = this.#edgeShift(highlightCoordinates, targetCoordinate, this.#shipOrientation);

		let domSquaresArr = Array.from(this.#friendlyBoardElement.querySelectorAll('.square'));
		let domHighlightSquares = 
			domSquaresArr.filter(square => 
				highlightCoordinates.includes(parseInt(square.dataset.coordinate))
			);

		domHighlightSquares.forEach(square => 
			square.classList.contains('placeShip') ?
			square.classList.remove('placeShip') :
			square.classList.add('placeShip')
		);
	}

	// returns left or right edge
	#getEdge(coordinates, targetCoordinate) {
		if (this.#shipOrientation === 'horizontal') {
			let leftEdgeCoordinate = coordinates.find(coordinate => coordinate % 10 === 0);
			let rightEdgeCoordinate = coordinates.find(coordinate => coordinate % 10 === 9);

			if (rightEdgeCoordinate !== undefined && targetCoordinate <= rightEdgeCoordinate)
				return 'right';

			if (leftEdgeCoordinate !== undefined && targetCoordinate >= leftEdgeCoordinate)
				return 'left';
			
			return undefined;
		}
	}

	#getOutOfBounds(coordinates, targetCoordinate) {
		let edge = this.#getEdge(coordinates, targetCoordinate);

		let edgeCoordinate = edge === 'left' ?
			coordinates.find(coordinate => coordinate % 10 === 0) :
			coordinates.find(coordinate => coordinate % 10 === 9);

		let outOfBounds = [];
		
		if (edge === undefined)
			return outOfBounds;

		if (edge === 'left')
			outOfBounds = coordinates.filter(coordinate => coordinate < edgeCoordinate);

		if (edge === 'right')
			outOfBounds = coordinates.filter(coordinate => coordinate > edgeCoordinate);

		return outOfBounds;
	}

}

module.exports = ScreenController
