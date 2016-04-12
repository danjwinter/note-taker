import React, { Component } from 'react';
import store from '../store';
import FileList from './file-list';
import { remote } from 'electron';
import ActiveFile from './active-file';

const { openFile } = remote.require(`${__dirname}/../main`);
// const mainProcess = remote.require(`${__dirname}/../main`);

class Application extends Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  componentDidMount() {
    store.on('change', files => {
      this.setState( { files });
    });
  }

  render() {
    let activeFile = this.state.files.find(file => file.active);
    return (
      <div>
        <div className="controls">
          <button className="controls-open-file" onClick={() => openFile()}>OpenFile</button>
          <button className="controls-open-file" onClick={() => store.deselect()}>Close current file</button>
        </div>
        <h1>Hello Steve!</h1>
        <div className="files">
          <FileList files={this.state.files} />
          <ActiveFile file={activeFile} />
        </div>
      </div>
    );
  }
}

export default Application;
