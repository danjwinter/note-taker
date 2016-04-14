import EventEmitter from 'events';
import { ipcRenderer } from 'electron';
import Selfup from 'selfup-rejs';
import { remote } from 'electron';
const { saveFile } = remote.require(`${__dirname}/main`);
const { openOldFile } = remote.require(`${__dirname}/main`);
const { saveFilesOnClose } = remote.require(`${__dirname}/main`);
const { saveAllFiles } = remote.require(`${__dirname}/main`);

const rejs = new Selfup();
openRoutine();
let files = [];

const store = new EventEmitter();

store.all = () => files.concat([]);

store.add = ({fileName, content}) => {
  rejs.newData('newNotes', {fileName: "dfd", content: 'dsds'});
  let id = rejs.findId('newNotes', '0').nextId - 1;
  files = files.concat({ fileName, content, active: false, markdown: false, id: id});
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
  rejs.newData('newNotes', {fileName: "dfd", content: 'dsds'});
  let id = rejs.findId('newNotes', '0').nextId - 1;
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
  // console.log(fileName);
  store.updateFileName(fileName, id);
});


function openRoutine(){
  let filesLastOpened = rejs.findId('filePaths', '1');
  console.log(filesLastOpened);
  if (filesLastOpened) {
    filesLastOpened.files.map((file) => {
      openOldFile(file.fileName);
    });
  }
}

ipcRenderer.on('program-closed', (event) => {
  let files = store.all();
  files = files.map((file) => {
    if (file.fileName == "New Note") {
      Object.assign({}, file, { fileName: `~/Documents/NewNote${id}` });
    }
    return Object.assign({}, file);
  });
  let fileArray = {files: files};
  rejs.updateTable('filePaths', fileArray);
  // saveAllFiles(files);
  // files.map((file) => {
  //
  //   saveFilesOnClose(file.fileName, file.content, file.id);
  // });

});

// ipcRenderer.on('about-to-quit', (event) => {
//   let files = store.all();
//   let fileArray = {files: files};
//   rejs.updateTable('filePaths', fileArray);
//   files.map((file) => {
//     saveFilesOnClose(file.fileName, file.content, file.id);
//   });
// });

module.exports = store;
