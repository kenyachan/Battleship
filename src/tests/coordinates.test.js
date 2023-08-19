const Coordinates = require('../coordinates');

describe('Test Coordinates Class', () => {
	let coordinates;
	let randomX;
	let randomY;

	beforeEach(() => {
		randomX = Math.floor(Math.random() * 9);
		randomY = Math.floor(Math.random() * 9);

		coordinates = new Coordinates(randomX, randomY);
	});

	describe('Test creation of coordinates', () => {
		test('x coordinate is equal to randomX', () => {
			expect(coordinates.x)
				.toEqual(randomX);
		});
		
		test('y coordinate is equal to randomY', () => {
			expect(coordinates.y)
				.toEqual(randomY);
		});
	});

	describe('Test coordinates equality', () => {
		test('True when coordinates are equal to itself', () => {
			expect(coordinates.equals(coordinates))
				.toBeTruthy();
		});

		test('True when coordinates are equal to another pair of coordinates with same x and y values', () => {
			expect(coordinates.equals(new Coordinates(randomX, randomY)))
				.toBeTruthy();
		});

		test('Throw an error if comparing with something that is not Coordinates', () => {
			expect(() => coordinates.equals(1))
				.toThrow();
		});
	});

	describe('Test toString', () => {
		test('Returns the coordintes as string', () => {
			expect(coordinates.toString())
				.toEqual(`(${randomX},${randomY})`);
		});
	});

	describe('Test updating coordinates', () => {
		test('X coordinate is incremented by 1', () => {
			expect(coordinates.x)
				.toEqual(randomX);
			coordinates.x = randomX + 1;
			expect(coordinates.x)
				.toEqual(randomX + 1);
		});

		test('Y coordinate is incrementated by 1', () => {
			expect(coordinates.y)
				.toEqual(randomY);
			coordinates.y = randomY + 1;
			expect(coordinates.y)
				.toEqual(randomY + 1);
		});
	});
});
