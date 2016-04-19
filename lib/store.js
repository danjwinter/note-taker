import EventEmitter from 'events';
import { ipcRenderer } from 'electron';
import { remote } from 'electron';
const {updateWindows} = remote.require(`${__dirname}/main`);

const store = new EventEmitter();

let files = JSON.parse(localStorage.getItem("files")) || [];

store.emit('change');

let idCounter = localStorage.getItem("idCounter") || 0;

store.all = () => files.concat([]);

store.add = ({fileName, content, active}) => {
  let id = ++idCounter;
  localStorage.setItem("idCounter", idCounter);
  files.unshift({ fileName, content, active: active || false, markdown: false, id: id});
  files = Object.assign([], files);
  store.emit('change', files);
};

store.remove = (id) => {
  files = files.filter(file => file.id !== id );
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
  let currentWindow = remote.getCurrentWindow();
  store.emit("change", files);
  updateWindows(files, currentWindow);
};

store.saveActiveFile = () => {
  let file = files.find(file => file.active);
  if (file) {
    store.saveContent(file.fileName, file.content);
  }
};

store.newFile = () => {
  store.deselect();
  let id = ++idCounter;
  localStorage.setItem("idCounter", idCounter);
  let newNote = { fileName: "New Note", content: "", active: true, id: id};
  files.unshift(newNote);
  files = Object.assign([], files);
  store.emit('change', files);
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
  store.emit('change', files);
};

ipcRenderer.on('file-opened', (event, file) => {
  store.add(file);
});

ipcRenderer.on('window-updated', (event, updatedFiles, currentWindow, windows) => {
  // if (remote.getCurrentWindow() !== currentWindow) {
    files = updatedFiles;
    store.emit('change', files);
  // }
});


ipcRenderer.on('file-saved', (event, fileName, id) => {
  store.updateFileName(fileName, id);
});

store.on('change', (event) => {
  let jsonFiles = JSON.stringify(files);
  localStorage.setItem("files", jsonFiles);
});

module.exports = store;
