import React from 'react';
import marked from 'marked';
import store from '../store'

const ActiveFile = ( {file} ) => {
  if (!file) { return <div>Please select a file or make a new note.</div>}

  const content = renderMarkdown(file.content);
  return (
    <div className="active-file">
      <h3>{file.fileName}</h3>
      <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      <div className="file-content" dangerouslySetInnerHTML={content}/>
    </div>
  );
};

const updateContent = (file, event) => store.saveContent(file.fileName, event.target.value);

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};


module.exports = ActiveFile;
