const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  mainWindow.loadFile('src/index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
