import React from 'react';
import sendGist from '../send-gist';
import MarkdownButtons from './markdown-buttons';
import MarkdownBox from './markdown-box';
import EditableNote from './editable-note';

module.exports = ( {file} ) => {
  if (!file.markdown) file = Object.assign({}, file, {className: "raw-file-content-no-markdown"});
return (
    <div className="active-file">
      <MarkdownButtons {...file}/>
      <EditableNote {...file}/>
      <MarkdownBox {...file}/>
    </div>
  );
};
