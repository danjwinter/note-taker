import React from 'react';
import sendGist from '../send-gist';
import renderMarkdownButtons from './render-markdown-buttons';
import renderMarkdownBox from './render-markdown-box';
import updateContent from '../update-content'


const ActiveFile = ( {file} ) => {

return (
    <div className="active-file">
      {renderMarkdownButtons(file)}
      <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      {renderMarkdownBox(file)}
    </div>
  );
};

module.exports = ActiveFile;
