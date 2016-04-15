import React from 'react';
import updateContent from '../update-content';

module.exports = (file) => {
  let className = file.className || "raw-file-content";
  return (
    <textarea onChange={updateContent.bind(this, file)} className={className} defaultValue={file.content}></textarea>
  );
};
