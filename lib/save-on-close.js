import { remote } from 'electron';
const { saveAllFiles } = remote.require(`${__dirname}/main`);

const saveItAll = () => {
  let files = JSON.parse(localStorage.getItem('files'));
  saveAllFiles(files);
};

module.exports = window.onunload = saveItAll;
