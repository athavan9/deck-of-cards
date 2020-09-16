const deck = require('./deck-of-cards-api');

const baseURL = 'https://deckofcardsapi.com/api/';

let deckID = null;
let score = 0;
let currentGuess = null;

const resetGame = () => {
    score = 0;
    currentGuess = null;
    deckID = null;
}

const guessColour = (colour) => {
    if (colour !== 'red' && colour !== 'black') {
        throw new Error('Should guess colour red or black!');
    }
    currentGuess = colour;
};

const flipCard = async () => {
    if (!currentGuess) {
        throw new Error('You need to guess before you flip!');
    }
    if (!deckID) {
        deckID = await deck.shuffleDeck(baseURL);
    }
    card = await deck.drawCard(baseURL, deckID)
    console.log('You drew: ' + card['code']);
    if ((currentGuess === 'red' && (card['suit'] === 'HEARTS' || card['suit'] === 'DIAMONDS')) ||
        (currentGuess === 'black' && (card['suit'] === 'CLUBS' || card['suit'] === 'SPADES'))) {
        currentGuess = null;
        score += 1;
        const remainingCards = await deck.remainingCards(baseURL, deckID);
        if (remainingCards != 0) {
            console.log('Current score: ' + score);
        } else {
            console.log('You win! You correctly guessed 52 cards! 🙌');
            resetGame();
        }
    } else {
        console.log('Sorry, game over! Final score: ' + score);
        resetGame();
    }
}

module.exports = {
    resetGame,
    guessColour,
    flipCard,
}
