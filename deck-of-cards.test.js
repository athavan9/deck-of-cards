const { shuffleDeck, drawCard } = require('./deck-of-cards-api.js');

const axios = require('axios')
jest.mock('axios');

beforeEach(() => {
  jest.resetAllMocks();
})

test('shuffleDeck call api and get a deck id' , async () => {
    // Arrange
    const expectedOutput = 'ABCD';

    axios.get.mockResolvedValue({
      data: {
        deck_id: expectedOutput,
      }
    });
    

    // Act
    const actualOutput = await shuffleDeck('https://deckofcardsapi.com/api/')
    // Assert
    expect(actualOutput).toBe(expectedOutput)
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toBeCalledWith('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  
});

test('shuffleDeck call api and get a deck id' , async () => {
  // Arrange
  const expectedOutput = 'ABCD';

  axios.get.mockResolvedValue({
    data: {
      deck_id: expectedOutput,
    }
  });
  

  // Act
  const actualOutput = await shuffleDeck('blah/')
  // Assert
  expect(actualOutput).toBe(expectedOutput)
  expect(axios.get).toBeCalledTimes(1)
  expect(axios.get).toBeCalledWith('blah/deck/new/shuffle/?deck_count=1')

});

test('drawCard calls api with deckID and gets a card' , async () => {
    // Arrange
    const expectedOutput = 'HA';
    const deckID = '123'

    axios.get.mockResolvedValue({
      data: {
        cards: [
          expectedOutput,
        ],
      }
    });

    // Act
    const actualOutput = await drawCard('https://deckofcardsapi.com/api/', deckID)
    // Assert
    expect(actualOutput).toBe(expectedOutput)
    expect(axios.get).toBeCalledTimes(1)
    expect(axios.get).toBeCalledWith(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
  
});
