import React, { Component } from 'react';
const lastActiveFile = require('../last-active-file');
import store from '../store';
import EditableNote from './editable-note';
import updateContent from '../update-content';
import { remote } from 'electron';
const { toggleStickyAlwaysOnTop, stickyOnTop } = remote.require(`${__dirname}/../main`);
import { ipcRenderer } from 'electron';

// console.log(stickyOnTop)

const currentWindow = remote.getCurrentWindow();

class StickyNote extends Component {
  constructor() {
    super();
    this.state = { note: lastActiveFile(), onTop: true};
  }

  componentDidMount() {
    store.on('change', files => {
      let updatedFile = files.find(file => file.id === this.state.note.id);
      this.setState( { note: updatedFile } );
    });
    ipcRenderer.on('toggle-on-top', (event) => {
      this.setState( { onTop: !this.state.onTop });
    });
  }

  render() {
    let file = this.state.note;
    return (
      <div className='sticky-note'>
        {toggleOnTopButton()}
        <EditableNote {...file} className='sticky-note-body'/>
      </div>
    );
  }
}

const toggleOnTopButton = () => {
    let buttonName = stickyOnTop(currentWindow) ? "Unpin" : "Pin";
    return   <button className="toggle-on-top" onClick={() => toggleStickyAlwaysOnTop(currentWindow)}>{buttonName}</button>;
};

export default StickyNote;
