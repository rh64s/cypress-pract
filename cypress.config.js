const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  experimentalMemoryManagement: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
  },
});
