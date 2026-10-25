import { defineConfig } from "@playwright/test";
export default defineConfig({
  fullyParallel: true,
  testDir: "./tests/e2e",
  timeout: 90000,
  workers: 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4181/pathology-informatics-interactives/",
    channel: process.env.CI ? undefined : "msedge",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview:pages",
    env: { PORT: "4181" },
    url: "http://127.0.0.1:4181/pathology-informatics-interactives/",
    reuseExistingServer: !process.env.CI,
  },
});
