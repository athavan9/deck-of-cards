const deck = require('./deck-of-cards-api');

const baseURL = 'https://deckofcardsapi.com/api/';

const getNewGame = () => {
    return {
        score: 0,
        currentGuess: null,
        deckID: null,
    }
}

const guessColour = (colour, state) => {
    if (colour !== 'red' && colour !== 'black') {
        throw new Error('Should guess colour red or black!');
    }
    return { ...state, currentGuess: colour }
};

const flipCard = async (state) => {
    if (!state.currentGuess) {
        throw new Error('You need to guess before you flip!');
    }
    const newState = { ...state }
    if (!state.deckID) {
        newState.deckID = await deck.shuffleDeck(baseURL);
    }
    card = await deck.drawCard(baseURL, newState.deckID)
    console.log('You drew: ' + card['code']);
    if ((state.currentGuess === 'red' && (card['suit'] === 'HEARTS' || card['suit'] === 'DIAMONDS')) ||
        (state.currentGuess === 'black' && (card['suit'] === 'CLUBS' || card['suit'] === 'SPADES'))) {
        newState.currentGuess = null;
        newState.score += 1;
        const remainingCards = await deck.remainingCards(baseURL, state.deckID);    
        if (remainingCards != 0) {
            // I think there's a bug here, shouldn't this be newState.score?
            // Yeah you're right
            // try now -- :)
            console.log('Current score: ' + newState.score);
        } else {
            console.log('You win! You correctly guessed 52 cards! 🙌');
        }
    } else {
        // same error here, but i wouldn't correct it untill we have a test to prove it wrong
        // The TDD way :) 
        // Yup!
        console.log('Sorry, game over! Final score: ' + state.score);
    }
    return newState;
}

module.exports = {
    getNewGame,
    guessColour,
    flipCard,
}
