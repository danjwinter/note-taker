import React, { Component } from 'react';
const lastActiveFile = require('../last-active-file');
import store from '../store';
import EditableNote from './editable-note';
import updateContent from '../update-content';

module.exports = ({file}) => {
  return (
    <EditableNote {...file} className="sticky-note"/>
  );
};
