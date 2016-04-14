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
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  rejs.createTable('filePaths');
  rejs.createTable('newNotes');
});

app.on('window-all-closed', function(event) {
  console.log(event);
  closeProcedure(function () {
    app.quit();
  });
});

const saveFile = (fileName, content, id) => {
  if (fileName === 'New Note') fileName = `~/Documents/NewNote`;
  dialog.showSaveDialog(
      {defaultPath: fileName},
    function (newFileName){
      if (newFileName === undefined) return;
      fs.writeFile(newFileName, content, 'utf8', (err) => {
        if (err) throw err;
        mainWindow.webContents.send('file-saved', newFileName, id);
        dialog.showMessageBox({ message: "That note has most definitely been saved!",
        buttons: ["Fantastic"]});
      });
  });
};

const saveFileOnClose = (fileName, content, id) => {

  if (fileName === "New Note") {
    fileName =  `~/Documents/NewNote${id}`;
    fs.writeFile(fileName, content, 'utf8', (err) => {
      return { fileName, content, id };
    });
  }
  fs.writeFile(fileName, content, 'utf8', (err) => {
  });
  return { fileName, content, id };
};

//localStorage.setItem(key, value)
//localStorage.getItem(key)
function closeProcedure(callback) {
  let filesLastOpened = rejs.findId('filePaths', '1');
  let files = saveAllFiles(filesLastOpened.files);
  console.log(files);
  let fileArray = {files: files};
  rejs.updateTable('filePaths', fileArray);

  if (typeof callback === 'function') {
    callback();
  }
}

const saveAllFiles = (files) => {
  return files.map((file) => {
     return Object.assign(file, saveFileOnClose(file.fileName, file.content, file.id));
  });
};


exports.openFile = require('./open-file');
exports.saveFile = saveFile;
exports.saveFileOnClose = saveFileOnClose;
exports.saveAllFiles = saveAllFiles;
