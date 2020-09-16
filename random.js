const { random } = require('./generator')

const rollD20 = () => {
    // Return a value between 1 & 20 (inclusive)
    return Math.floor(random() * 20) + 1;
}

module.exports = {
    rollD20
}
