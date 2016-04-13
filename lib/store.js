import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let files = [];

const store = new EventEmitter();

store.all = () => files.concat([]);

store.add = ({fileName, content}) => {
  files = files.concat({ fileName, content, active: false, markdown: false});
  store.emit('change', files);
};

store.remove = (fileName) => {
  files = files.filter(file => file.fileName !== fileName );
  store.emit('change', files);
};

store.select = (fileName) => {
  files = files.map(file => {
    if (file.fileName === fileName) {
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

store.saveContent = (fileName, updatedContent) => {
  files = files.map((file) => {
    if (file.fileName === fileName) {
      return Object.assign({}, file, { content: updatedContent});
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.newFile = () => {
  store.deselect();
  files = files.concat({ fileName: "New Note", content: "", active: true});
  store.emit('change', files);
};

store.addMarkdown = (fileName) => {
  files = files.map((file) => {
    if (file.fileName === fileName) {
      return Object.assign({}, file, { markdown: true });
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.removeMarkdown = (fileName) => {
  files = files.map((file) => {
    if (file.fileName === fileName) {
      return Object.assign({}, file, { markdown: false });
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
};

store.findActiveFile = () => {
  return files.find(file => file.active);
};

ipcRenderer.on('file-opened', (event, file) => {
  store.add(file);
});

module.exports = store;
