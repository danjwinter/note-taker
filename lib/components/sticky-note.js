import React, { Component } from 'react';
const lastActiveFile = require('../last-active-file');
import store from '../store';
import EditableNote from './editable-note';
import updateContent from '../update-content';

class StickyNote extends Component {
  constructor() {
    super();
    this.state = { note: lastActiveFile() };
  }

  componentDidMount() {
    store.on('change', files => {
      let updatedFile = files.find(file => file.id === this.state.note.id);
      this.setState( { note: updatedFile } );
    });
  }

  render() {
    let file = this.state.note;
    return (
      <EditableNote {...file} className="sticky-note"/>
    );
  }
}

export default StickyNote;
