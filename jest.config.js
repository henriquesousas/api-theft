module.exports = {
  roots: ['<rootDir>/api/test'],
  collectCoverageFrom: [
    '<rootDir>/api/**/*.ts',
    '!<rootDir>/api/src/main/**' // Não mapear no coverage
  ],
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
