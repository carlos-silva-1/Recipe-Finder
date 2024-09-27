module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { configFile: './tests/babel.config.js' }],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
