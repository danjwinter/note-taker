const electron = require('electron');
const fs = require('fs');
const app = electron.app;

const saveFileOnClose = (fileName, content, id) => {

  if (fileName === "New Note") {
    let path = app.getPath('documents');
    fileName =  `${path}/NewNote${id}`;
    fs.writeFile(fileName, content, 'utf8', (err) => {
      return { fileName, content, id };
    });
  }
  fs.writeFile(fileName, content, 'utf8', (err) => {
  });
  return { fileName, content, id };
};

module.exports = (files) => {
  return files.map((file) => {
     return Object.assign(file, saveFileOnClose(file.fileName, file.content, file.id));
  });
};
