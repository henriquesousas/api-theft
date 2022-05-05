module.exports = {
  roots: ['<rootDir>/api/test'],
  collectCoverageFrom: [
    '<rootDir>/api/**/*.ts',
    '!<rootDir>/api/src/main/**' // Não mapear no coverage
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
