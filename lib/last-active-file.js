import store from './store';

const lastActiveFile = (files) => {
  files = files || [];
  let file = files.find(file => file.active);
  return file || store.findActiveFile() || store.newFile();
};

module.exports = lastActiveFile;
