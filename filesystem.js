const fs = require('fs')

const getUsers = async () => {
    const userData = await fs.readFileSync('data/users.json')
    return JSON.parse(userData);
}

const writeUsers = async (filename, userObject) => {
    const userString = JSON.stringify(userObject);
    return await fs.writeFileSync(filename, userString);
}

module.exports = {
    getUsers,
    writeUsers
}
