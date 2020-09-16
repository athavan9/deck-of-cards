const { resetGame } = require('./red-or-black.js');
test.skip('resetGame resets score guess and id', () => {
  let score = 1;
  let currentGuess = 'red';
  let deckID = 'id';

  resetGame();

  expect(score).toBe(0);
  expect(currentGuess).toBe(null);
  expect(deckID).toBe(null);
});

