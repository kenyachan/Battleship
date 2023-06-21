const Coordinates = require('../coordinates');

let coordinates;
let randomX;
let randomY;

beforeEach(() => {
	randomX = Math.floor(Math.random() * 9);
	randomY = Math.floor(Math.random() * 9);

	coordinates = new Coordinates(randomX, randomY);
});

describe('Check coordinates are created properly', () => {
	test('x coordinate', () => {
		expect(coordinates.x).toEqual(randomX);
	});
	
	test('y coordinate', () => {
		expect(coordinates.y).toEqual(randomY);
	});
});

describe('Check equality', () => {
	test('True when coordinates are equal to itself', () => {
		expect(coordinates.equals(coordinates)).toBeTruthy();
	});

	test('True when coordinates are equal to another set of coordinates with same values', () => {
		expect(coordinates.equals(new Coordinates(randomX, randomY))).toBeTruthy();
	});

	test('Throw an error if comparing with something that is not Coordinates', () => {
		expect(() => coordinates.equals(1)).toThrow();
	});
});

describe('Test toString', () => {
	test('Returns the coordintes as string', () => {
		expect(coordinates.toString()).toEqual(`(${randomX},${randomY})`);
	});
});

describe('Updating coordinates', () => {
	test('X coordinate is updated', () => {
		expect(coordinates.x).toEqual(randomX);
		
		coordinates.x = randomX + 1;

		expect(coordinates.x).toEqual(randomX + 1);
	});

	test('Y coordinate is updated', () => {
		expect(coordinates.y).toEqual(randomY);

		coordinates.y = randomY + 1;

		expect(coordinates.y).toEqual(randomY + 1);
	});
});
