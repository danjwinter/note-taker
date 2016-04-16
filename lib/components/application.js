import React, { Component } from 'react';
import store from '../store';
import FileList from './file-list';
import { remote } from 'electron';
import ActiveFile from './active-file';
const lastActiveFile = require('../last-active-file');
import saveOnClose from '../save-on-close';
import loadSavedFiles from '../load-saved-files';
import Controls from './controls';

saveOnClose();
loadSavedFiles();

class Application extends Component {
  constructor() {
    super();
    this.state = { files: store.all(), stickies: [] };
  }

  componentDidMount() {
    store.on('change', (files) => {
      this.setState( { files });
    });
  }

  render() {
    let activeFile = lastActiveFile(this.state.files);

    return (
      <div>
        <Controls {...activeFile} />
        <div className="files">
          <FileList files={this.state.files} />
          <ActiveFile file={activeFile} />
        </div>
      </div>
    );
  }
}

export default Application;
