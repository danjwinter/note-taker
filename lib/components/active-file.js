import React from 'react';
import sendGist from '../send-gist';
import MarkdownButtons from './markdown-buttons';
import MarkdownBox from './markdown-box';
import EditableNote from './editable-note';

module.exports = ( {file} ) => {
return (
    <div className="active-file">
      <MarkdownButtons {...file}/>
      <EditableNote {...file}/>
      <MarkdownBox {...file}/>
    </div>
  );
};
