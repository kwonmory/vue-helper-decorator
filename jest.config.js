module.exports = {
  verbose: false,
  setupFilesAfterEnv: ['given2/setup', 'jest-plugin-context/setup'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
