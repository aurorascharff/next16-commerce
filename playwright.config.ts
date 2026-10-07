import { defineConfig, devices } from '@playwright/test';

const externalBaseURL = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalBaseURL ?? 'http://127.0.0.1:3100';

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: false,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  testDir: './tests',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: externalBaseURL
    ? undefined
    : {
        command: 'pnpm start --port 3100',
        reuseExistingServer: false,
        stdout: 'pipe',
        url: baseURL,
      },
  workers: 1,
});
