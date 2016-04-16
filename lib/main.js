const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const Selfup = require('selfup-rejs');
const rejs = new Selfup();

let mainWindow = null;
let allWindows = null;
let stickyCounter = 0;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  allWindows = [mainWindow];
});

app.on('window-all-closed', function(event) {
  app.quit();
});

const newSticky = () => {
  let stickyWindow = new BrowserWindow({
    'title-bar-style': 'hidden-inset'
  });
  let id = ++stickyCounter;
  allWindows = allWindows.concat(stickyWindow);
  stickyWindow.setSize(350,300);
  stickyWindow.setResizable(false);
  stickyWindow.setPosition(1050,50);
  stickyWindow.setAlwaysOnTop(true);
  stickyWindow.loadURL(`file://${__dirname}/sticky.html`);
};

const updateWindows = (files) => {
  allWindows.forEach((activeWindow) => {
    activeWindow.webContents.send('window-updated', files);
  });
};


exports.openFile = require('./open-file');
exports.saveFile = require('./save-file');
exports.saveAllFiles = require('./save-all-files');
exports.newSticky = newSticky;
exports.updateWindows = updateWindows;
