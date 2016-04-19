import store from './store';

module.exports = (file, event) => {
  console.log(event);
  store.saveContent(file.id, event.target.value);
};
