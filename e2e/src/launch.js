import { dirname, join } from "path";
import { _electron as electron } from "playwright";
import { fileURLToPath } from "url";
import { expect } from "@playwright/test";

const __dirname = dirname(fileURLToPath(import.meta.url));

const launchApp = async () => {
  const electronApp = await electron.launch({
    args: ["mainProcess.js"],
    cwd: join(__dirname, "..", ".."),
  });
  return electronApp;
};

const main = async () => {
  // Launch Electron app.
  const electronApp = await launchApp();

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  const window = await electronApp.firstWindow();
  const title = await window.title();
  expect(title).toBe("Markdown Editor");

  const input = window.locator("#Input");
  await expect(input).toHaveText("# hello markdown");

  const output = window.locator("#Output");
  expect(await output.innerHTML()).toBe(
    `<h1 id="hello-markdown">hello markdown</h1>
`
  );

  await input.selectText();
  await input.type("# hello world");

  expect(await output.innerHTML()).toBe(
    `<h1 id="hello-world">hello world</h1>
`
  );

  if (process.send) {
    process.send("succeeded");
  }
};

main();
