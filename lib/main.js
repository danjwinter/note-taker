const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/index.html`);
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

const saveFile = (fileName, content) => {
  dialog.showSaveDialog(
      {defaultPath: fileName},
    function (newFileName){
      if (newFileName === undefined) return;
      fs.writeFile(newFileName, content, 'utf8', (err) => {
        console.log('save  callback');
        if (err) throw err;
        dialog.showMessageBox({ message: "That note has most definitely been saved!",
        buttons: ["Fantastic"]});
      });
  });
};

exports.openFile = openFile;
exports.saveFile = saveFile;
