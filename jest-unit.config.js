// Indica que o npm test irá testar isoladamente os specs e não todos
const config = require('./jest.config')
config.testMatch = ['**/*.spec.ts']
module.exports = config
