const fs = require('fs')

jest.mock('fs');

const { getUsers, writeUsers } = require('./filesystem')

beforeEach(() => {
    jest.resetAllMocks();
})

test('should fetch users', async () => {
    // Arrange
    const expectedOutput = [{"name": "Mike"}, {"name": "Edward"}]
    fs.readFileSync.mockResolvedValue(JSON.stringify(expectedOutput))
    // Act
    const actualOutput = await getUsers();
    // Assert
    expect(actualOutput).toEqual(expectedOutput);
    expect(fs.readFileSync.mock.calls.length).toBe(1)
    expect(fs.readFileSync.mock.calls[0][0]).toBe('data/users.json')
})

test('should write users', async () => {
    // Arrange
    const filename = 'data/test-users.json'
    const userData = [{"name": "Mike"}, {"name": "Emily"}]
    // Act
    await writeUsers(filename, userData)
    // Assert
    expect(fs.writeFileSync.mock.calls.length).toBe(1);
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(filename)
    expect(fs.writeFileSync.mock.calls[0][1]).toBe(JSON.stringify(userData))
    expect(fs.readFileSync.mock.calls.length).toBe(0)
})
