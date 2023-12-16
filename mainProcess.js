const { app, BrowserWindow } = require("electron");

// @ts-ignore
process.mainModule = {
  require,
};

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  await mainWindow.loadFile("src/index.html");
};

const handleWindowAllClosed = () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
};

const handleActivate = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
};

const handleReady = async () => {
  await createWindow();
};

const main = () => {
  app.on("window-all-closed", handleWindowAllClosed);
  app.on("activate", handleActivate);
  app.on("ready", handleReady);
};

main();
