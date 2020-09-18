const { guessColour, getNewGame, flipCard } = require('./red-or-black')
const deck = require('./deck-of-cards-api');
jest.mock('./deck-of-cards-api')

test('Guess Green', () =>{
  const guess = 'green'
  const state = getNewGame()
  // Act & Assert
  expect(() => guessColour(guess, state)).toThrow()
})

test.each([
  ['red'],
  ['black'],
])('%#. guess %s', (guess) => {
    // Arrange
    const state = getNewGame()
    // Act
    const newState = guessColour(guess, state)
    // Assert
    expect(newState.currentGuess).toBe(guess)
});

describe('flip card', () => {
  let mockConsoleLog

  beforeEach(() => {
    jest.resetAllMocks();
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    mockConsoleLog.mockRestore();
  })

  it('throws an error if not guess has been provided', async () => {
    expect(flipCard).toBeDefined()
    expect(async () => await flipCard({})).rejects.toThrow()
  });
  it('incrememnts score if guess is correct', async () => {


    // Arrange
    const currentGuess = 'red';
    const score = 0;
    const deckID = "ID";
    const cardCode = 'code'
    const state = {
      currentGuess,
      score,
      deckID,
    }
    const expectedState = {
        currentGuess: null,
        score: 1,
        deckID,
    };

    deck.drawCard.mockResolvedValue({
      suit: 'HEARTS',
      code: cardCode, 
    });
    deck.remainingCards.mockResolvedValue(1);
    
    // Act
    const actualState = await flipCard(state)
    // Assert
    expect(actualState).toEqual(expectedState)
    expect(deck.shuffleDeck).toBeCalledTimes(0)
    expect(deck.drawCard).toBeCalledTimes(1)
    expect(deck.drawCard).toBeCalledWith('https://deckofcardsapi.com/api/', deckID)

    expect(mockConsoleLog).toBeCalledTimes(2)

    expect(mockConsoleLog).toHaveBeenNthCalledWith(1, `You drew: ${cardCode}`);
    expect(mockConsoleLog).toHaveBeenNthCalledWith(2, 'Current score: 1');
  });
});
