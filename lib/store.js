import EventEmitter from 'events';
import Selfup from 'selfup-rejs';
import { readFileSync } from 'fs';
import { remote, ipcRenderer } from 'electron';
const { saveFile, saveFileOnClose, saveAllFiles, closeProcedure } = remote.require(`${__dirname}/main`);

const rejs = new Selfup();

const store = new EventEmitter();
let files = JSON.parse(localStorage.getItem("files")) || [];
store.emit('change');
let idCounter = localStorage.getItem("idCounter") || 0;
store.all = () => files.concat([]);

const saveItAll = () => {
  files = JSON.parse(localStorage.getItem('files'));
  saveAllFiles(files);
};

window.onunload = saveItAll;
store.add = ({fileName, content, active}) => {
  let id = ++idCounter;
  localStorage.setItem("idCounter", idCounter);
  files = files.concat({ fileName, content, active: active || false, markdown: false, id: id});
  store.emit('change', files);
};

store.remove = (id) => {
  files = files.filter(file => file.id !== id );
    // let fileArray = {files: files};
    // rejs.updateTable('filePaths', fileArray);
  store.emit('change', files);
};

store.updateFileName = (newFileName, id) => {
  files = files.map((file) => {
    if (file.id === id) {
      return Object.assign({}, file, {fileName: newFileName});
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.select = (id) => {
  files = files.map(file => {
    if (file.id === id) {
      return Object.assign({}, file, { active: true });
    }
    return Object.assign({}, file, { active: false});
  });

  store.emit('change', files);
};

store.deselect = () => {
  files = files.map(file => Object.assign({}, file, { active: false }));
  store.emit('change', files);
};

store.saveContent = (id, updatedContent) => {
  files = files.map((file) => {
    if (file.id === id) {
      return Object.assign({}, file, { content: updatedContent});
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.saveActiveFile = () => {
  let file = files.find(file => file.active);
  if (file) {
    store.saveContent(file.fileName, file.content);
  }
};

store.newFile = () => {
  store.saveActiveFile();
  store.deselect();
  // rejs.newData('newNotes', {fileName: "dfd", content: 'dsds'});
  // let id = rejs.findId('newNotes', '0').nextId - 1;
  let id = ++idCounter;
  localStorage.setItem("idCounter", idCounter);

  let newNote = { fileName: "New Note", content: "", active: true, id: id};
  files = files.concat(newNote);
  store.emit('change', files);
  return newNote;
};

store.addMarkdown = (id) => {
  files = files.map((file) => {
    if (file.id === id) {
      return Object.assign({}, file, { markdown: true });
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.removeMarkdown = (id) => {
  files = files.map((file) => {
    if (file.id === id) {
      return Object.assign({}, file, { markdown: false });
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.findActiveFile = () => {
  return files.find(file => file.active);
};

store.saveGist = (fileName, gistUrl) => {
  files = files.map((file) => {
    if (file.fileName === fileName) {
      return Object.assign({}, file, { gist: gistUrl });
    }
    return Object.assign({}, file);
  });
  console.log('made it through gist assignment');
  store.emit('change', files);
};

ipcRenderer.on('file-opened', (event, file) => {
  store.add(file);
});

ipcRenderer.on('file-saved', (event, fileName, id) => {
  store.updateFileName(fileName, id);
});



function loadSavedFiles() {
  // const savedFiles = rejs.findId('filePaths', '1').files;
  const savedFiles = JSON.parse(localStorage.getItem('files')) || [];
  return savedFiles.map(file => {
    try {

      const newContent = readFileSync(file.fileName).toString();
      return Object.assign(file, { content: newContent});
    } catch (e) {
      if (e.message.includes('ENOENT')) {return undefined;}
      throw e;
    }
  }).filter(file => file);
}

store.on('change', (event) => {
  let jsonFiles = JSON.stringify(files);
  localStorage.setItem("files", jsonFiles);
});

module.exports = store;
