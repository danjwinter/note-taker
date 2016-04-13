import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let files = [];
let noteCounter = 0;

const store = new EventEmitter();

store.all = () => files.concat([]);

store.add = ({fileName, content}) => {
  noteCounter++;
  files = files.concat({ fileName, content, active: false, markdown: false, id: noteCounter});
  store.emit('change', files);
};

store.remove = (id) => {
  files = files.filter(file => file.id !== id );
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
  files = files.concat({ fileName: "New Note", content: "", active: true, id: noteCounter});
  noteCounter++;
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

ipcRenderer.on('file-opened', (event, file) => {
  store.add(file);
});

module.exports = store;
