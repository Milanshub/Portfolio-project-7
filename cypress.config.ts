import { defineConfig } from "cypress";

const config = defineConfig({
  projectId: '3eej9n',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});

export default config;