import store from './store';

const lastActiveFile = (files) => {
  let file = files.find(file => file.active);
  return file || files[files.length - 1] || store.newFile();
};

module.exports = lastActiveFile;
