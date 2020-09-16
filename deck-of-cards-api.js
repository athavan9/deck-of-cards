const axios = require('axios').default;

const shuffleDeck = async (baseURL) => {
    const response = await axios.get(baseURL + 'deck/new/shuffle/?deck_count=1')
    return response['data']['deck_id']
}

const drawCard = async (baseURL, deckID) => {
    const response = await axios.get(baseURL + 'deck/' + deckID + '/draw/?count=1')
    return response['data']['cards'][0]
}

const remainingCards = async (baseURL, deckID) => {
    const response = await axios.get(baseURL + 'deck/' + deckID);
    return response['data']['remaining']
}

module.exports = {
    shuffleDeck,
    drawCard,
    remainingCards,
}
