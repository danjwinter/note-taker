import store from './store';

module.exports = (file, event) => {
  store.saveContent(file.id, event.target.value);
};
