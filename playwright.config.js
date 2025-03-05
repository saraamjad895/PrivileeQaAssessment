module.exports = {
  testDir: './tests', 
  timeout: 30000,  // Set a reasonable timeout
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* Retry 3 times in CI, 1 time locally */
  retries: process.env.CI ? 3 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  expect: {
    timeout: 10000,  // Timeout for assertions
  },
  reporter: [['allure-playwright']],
  use: {

    browserName : 'chromium',
    headless : true,
    screenshot: 'only-on-failure',
    screenshotPath: 'reports/screenshots',
    trace : 'off',

  },
};