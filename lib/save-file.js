const electron = require('electron');
const fs = require('fs');
const dialog = electron.dialog;
import { remote } from 'electron';
const app = electron.app;

module.exports = (fileName, content, id, currentWindow) => {

  if (fileName === 'New Note') {
    let path = app.getPath('documents');
    fileName = `${path}/NewNote`;
  }
  dialog.showSaveDialog(
      {defaultPath: fileName},
    function (newFileName){
      if (newFileName === undefined) return;
      fs.writeFile(newFileName, content, 'utf8', (err) => {
        if (err) throw err;
        currentWindow.webContents.send('file-saved', newFileName, id);
        dialog.showMessageBox({ message: "That note has most definitely been saved!",
        buttons: ["Fantastic"]});
      });
  });
};
