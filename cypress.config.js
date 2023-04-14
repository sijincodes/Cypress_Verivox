const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.verivox.de/",
    // testFiles: "**/*.{feature,features}",
    specPattern: "cypress/e2e/integration/**/*.js",
    //chromeWebSecurity: false,
  },
});
