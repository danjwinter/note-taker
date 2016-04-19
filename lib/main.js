const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.setSize(1000,700);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

app.on('window-all-closed', function(event) {
  app.quit();
});

const newSticky = () => {
  let stickyWindow = new BrowserWindow({
    'title-bar-style': 'hidden-inset'
  });

  stickyWindow.setSize(350,300);
  stickyWindow.setResizable(false);
  stickyWindow.setPosition(1050,50);
  stickyWindow.setAlwaysOnTop(true);
  stickyWindow.loadURL(`file://${__dirname}/sticky.html`);
};

const toggleStickyAlwaysOnTop = (currentWindow) => {
  currentWindow.setAlwaysOnTop(!currentWindow.isAlwaysOnTop());
  currentWindow.webContents.send('toggle-on-top');
};

const stickyOnTop = (currentWindow) => {
  return currentWindow.isAlwaysOnTop();
};

exports.openFile = require('./open-file');
exports.saveFile = require('./save-file');
exports.saveAllFiles = require('./save-all-files');
exports.newSticky = newSticky;
exports.stickyOnTop = stickyOnTop;
exports.toggleStickyAlwaysOnTop = toggleStickyAlwaysOnTop;
