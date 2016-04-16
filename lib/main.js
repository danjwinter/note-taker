const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;
const async = require('async');


let mainWindow = null;
let allWindows = null;
let stickyCounter = 0;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  allWindows = [{id: 'main', window: mainWindow}];
});

app.on('window-all-closed', function(event) {
  app.quit();
});

const newSticky = () => {
  let stickyWindow = new BrowserWindow({
    'title-bar-style': 'hidden-inset'
  });
  let id = ++stickyCounter;
  allWindows = allWindows.concat({ id, window: stickyWindow});

  stickyWindow.setSize(350,300);
  stickyWindow.setResizable(false);
  stickyWindow.setPosition(1050,50);
  stickyWindow.setAlwaysOnTop(true);
  stickyWindow.on('closed', () => removeFromAllWindows({id, window: stickyWindow}));
  stickyWindow.loadURL(`file://${__dirname}/sticky.html`);
};

const updateWindows = (files, currentWindow) => {
  windowsSend = allWindows.map(function(activeWindow) {
    return activeWindow.call(this, 'window-updated', files);
  });
  async.parallel(windowSend);
};

const removeFromAllWindows = (currentWindow) => {
  allWindows = allWindows.filter(browser => browser.id !== currentWindow.id);
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
exports.updateWindows = updateWindows;
exports.stickyOnTop = stickyOnTop;
exports.toggleStickyAlwaysOnTop = toggleStickyAlwaysOnTop;
exports.removeFromAllWindows = removeFromAllWindows;
