const generator = require('./generator')

jest.spyOn(generator, 'random').mockReturnValue(0.5);

const rollD20 = require('./random').rollD20

test('should return a sensible value', () => {
    // Arrange
    const expectedOutput = 11
    // Act
    const randomNumber = rollD20();
    // Assert
    expect(randomNumber).toEqual(expectedOutput);
});
