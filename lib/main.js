const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const Selfup = require('selfup-rejs');
const rejs = new Selfup();

let mainWindow = null;
let stickyWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

app.on('window-all-closed', function(event) {
  app.quit();
});

const newSticky = () => {
  stickyWindow = new BrowserWindow();
  stickyWindow.setSize(350,300);
  stickyWindow.setResizable(false);
  stickyWindow.setPosition(1050,50);
  stickyWindow.setAlwaysOnTop(true);
  stickyWindow.loadURL(`file://${__dirname}/sticky.html`);
};


exports.openFile = require('./open-file');
exports.saveFile = require('./save-file');
exports.saveAllFiles = require('./save-all-files');
exports.newSticky = newSticky;
