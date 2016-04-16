import React from 'react';
import store from '../store';
import FileTitle from './file-title';
import { remote } from 'electron';
const openFile = remote.require(`${__dirname}/../open-file`);
const { saveFile, newSticky } = remote.require(`${__dirname}/../main`);

const currentWindow = remote.getCurrentWindow();

module.exports = (activeFile) => {
  return (
    <div className="controls">
      <button className="controls-new-file" onClick={() => store.newFile()}>New Note</button>
      <button className="controls-open-file" onClick={() => openFile(currentWindow)}>Open File</button>
      {saveFileButton(activeFile)}
      <button className="controls-open-file" onClick={() => store.deselect()}>Close Current File</button>
      <button className="controls-sticky-note" onClick={() => createSticky()}>Create Sticky Note</button>
      <FileTitle {...activeFile}/>
    </div>
  );
};

const createSticky = () => {
  newSticky();
};

const saveFileButton = (activeFile) => {
  if (activeFile) {
    return <button className="controls-open-file" onClick={() => saveFile(activeFile.fileName, activeFile.content, activeFile.id, currentWindow)}>Save Current File</button>;
  }
};
