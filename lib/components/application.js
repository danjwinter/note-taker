import React, { Component } from 'react';
import store from '../store';
import FileList from './file-list';
import { remote } from 'electron';
import ActiveFile from './active-file';
const Selfup = require('selfup-rejs');
const rejs = new Selfup();


const openFile = remote.require(`${__dirname}/../open-file`);
const { saveFile } = remote.require(`${__dirname}/../main`);
const lastActiveFile = require('../last-active-file');

const currentWindow = remote.getCurrentWindow();
console.log(lastActiveFile);
class Application extends Component {
  constructor() {
    super();
    this.state = { files: store.all() };
  }

  componentDidMount() {
    store.on('change', files => {
      this.setState( { files });
    });
  }

  render() {
    let activeFile = lastActiveFile(this.state.files, store);

    return (
      <div>
        <div className="controls">
          <button className="controls-new-file" onClick={() => store.newFile()}>New Note</button>
          <button className="controls-open-file" onClick={() => openFile(currentWindow)}>Open File</button>
          {saveFileButton(activeFile)}
          <button className="controls-open-file" onClick={() => store.deselect()}>Close current file</button>
          {renderTitle(activeFile)}
        </div>
        <div className="files">
          <FileList files={this.state.files} />
          <ActiveFile file={activeFile} />
        </div>
      </div>
    );
  }
}

// function lastActiveFile(files, store) {
//   let file = files.find(file => file.active);
//   return file || files[files.length - 1] || store.newFile();
// }

const renderTitle = (file) => {
  if (file) {
    return (
      <h3>{file.fileName}</h3>
    );
  }
};

const saveFileButton = (activeFile) => {
  if (activeFile) {
    return <button className="controls-open-file" onClick={() => saveFile(activeFile.fileName, activeFile.content, activeFile.id)}>Save Current File</button>;
  }
};

export default Application;
