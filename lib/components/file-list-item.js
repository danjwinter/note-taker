import React from 'react';
import store from '../store';
import path from 'path';
import truncate from '../truncate';

const FileListItem = (file) => {
  const content = truncate(file.content, 25);
  const fileName = path.basename(file.fileName);

  return (
    <div className="file-list-item" onClick={() => store.select(file.id) }>
      <div className="title-remove-note"><button onClick={() => store.remove(file.id) }>X</button>
      <h3 className="file-list-item-title">{fileName}</h3></div>
      <div className="file-list-item-content">{content}</div>
    </div>
  );
};

module.exports = FileListItem;
