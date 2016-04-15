const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const Selfup = require('selfup-rejs');
const rejs = new Selfup();

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

app.on('window-all-closed', function(event) {
  app.quit();
});

exports.openFile = require('./open-file');
exports.saveFile = require('./save-file');
exports.saveAllFiles = require('./save-all-files');
