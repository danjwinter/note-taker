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

// needs app, dialog and fs when you extract it
// have it take in currentWindow instead o using mainWindow
const openFile = () => {
  const files = dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
    ]
  });

  if (!files) { return; }

  const fileName = files[0];
  const content = fs.readFileSync(fileName).toString();

  app.addRecentDocument(fileName);

  mainWindow.webContents.send('file-opened', { fileName, content });
};

// let t = 0;

// const openOldFile = (fileName, active) => {
//   try {
//     debugger
//     const file = fs.readFileSync(fileName);
//     let content = file.toString();
//     app.addRecentDocument(fileName);
//     console.log(++t, { fileName, content, active });
//     mainWindow.webContents.send('file-opened', { fileName, content, active });
//   } catch (e) {
//     let files = rejs.findId('filePaths', '1');
//     debugger
//     // let file = files.find(file => file.fileName === fileName);
    // let index = files.indexOf(file);
    // files.splice(index, 1);
    // let fileArray = {files: files};
//     // rejs.updateTable('filePaths', fileArray);
//   }
// };

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
  // console.log(filesLastOpened);
  let files = saveAllFiles(filesLastOpened.files);
  console.log(files);
  let fileArray = {files: files};
  rejs.updateTable('filePaths', fileArray);

  if (typeof callback === 'function') {
    callback();
  }
}

const saveAllFiles = (files) => {
  // console.log(files)
  return files.map((file) => {
     return Object.assign(file, saveFileOnClose(file.fileName, file.content, file.id));
  });
};


exports.openFile = require('./open-file');
// exports.openFile = openFile;
exports.saveFile = saveFile;
// exports.openOldFile = openOldFile;
exports.saveFileOnClose = saveFileOnClose;
exports.saveAllFiles = saveAllFiles;
