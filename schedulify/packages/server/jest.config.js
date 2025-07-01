module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  globalSetup: './test/global-setup.js',
  globalTeardown: './test/global-teardown.js',
  setupFiles: ['dotenv/config'],
};