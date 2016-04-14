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
  mainWindow.webContents.send('program-closed');
  setTimeout(closeProcedure, 2000);
  setTimeout(app.quit, 2500);
  // (app.quit);
  // closeProcedure();
  // app.quit();
});

app.on('before-quit', function() {
  mainWindow.webContents.send('about-to-quit');

});

app.on('browser-window-blur', function() {
  mainWindow.webContents.send('about-to-quit');

});

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

const openOldFile = (fileName) => {
    try {const file = fs.readFileSync(fileName);

      let content = file.toString();
      app.addRecentDocument(fileName);
      mainWindow.webContents.send('file-opened', { fileName, content });
  } catch (e) {}
};

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

function closeProcedure() {
  let filesLastOpened = rejs.findId('filePaths', '1');
  console.log(filesLastOpened);
  let lastFilePaths = filesLastOpened.files.map((file) => {
    saveFilesOnClose(file.fileName, file.content, file.id);
  });
}

const saveFilesOnClose = (fileName, content, id) => {

  if (fileName === "New Note") {
    fileName =  `~/Documents/NewNote${id}`;
    fs.writeFile(fileName, content, 'utf8', (err) => {
      console.log(fileName, content);
    });
  }
  fs.writeFile(fileName, content, 'utf8', (err) => {
    console.log(fileName, content);
  });
};

const saveAllFiles = (files) => {
  files.map((file) => {
    saveFilesOnClose(file.fileName, file.content, file.id);
  });
};


exports.openFile = openFile;
exports.saveFile = saveFile;
exports.openOldFile = openOldFile;
exports.saveFilesOnClose = saveFilesOnClose;
exports.saveAllFiles = saveAllFiles;
