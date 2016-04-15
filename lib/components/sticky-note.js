import React, { Component } from 'react';
const lastActiveFile = require('../last-active-file');
import store from '../store';
import EditableNote from './editable-note';

module.exports = () => {
  let file = Object.assign({}, store.findActiveFile(), {className: "sticky-note"});


  return (
    <EditableNote {...file}/>
  );
};
