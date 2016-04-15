const electron = require('electron');
const fs = require('fs');
const app = electron.app;
const dialog = electron.dialog;

module.exports = (currentWindow) => {
  const files = dialog.showOpenDialog(currentWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown Files', extensions: ['md', 'markdown', 'txt'] }
    ]
  });

  if (!files) { return; }

  const fileName = files[0];
  const content = fs.readFileSync(fileName).toString();

  app.addRecentDocument(fileName);

  currentWindow.webContents.send('file-opened', { fileName, content });
};
