import React from 'react';
import sendGist from '../send-gist';
import MarkdownButtons from './markdown-buttons';
import MarkdownBox from './markdown-box';
import updateContent from '../update-content'


const ActiveFile = ( {file} ) => {

return (
    <div className="active-file">
      <MarkdownButtons {...file}/>
      <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      <MarkdownBox {...file}/>
    </div>
  );
};

module.exports = ActiveFile;
