import React from 'react';
import updateContent from '../update-content';

module.exports = (file) => {
  return (
    <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
  );
};
