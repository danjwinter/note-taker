import store from './store';

module.exports = (file, event) => {
  console.log(event);
  console.log(event.eventPhase);
  store.saveContent(file.id, event.target.value);
};
