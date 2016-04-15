const lastActiveFile = (files, store) => {
  let file = files.find(file => file.active);
  return file || files[files.length - 1] || store.newFile();
};

module.exports = lastActiveFile;
