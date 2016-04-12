import React from 'react';
import marked from 'marked';
import store from '../store'

const ActiveFile = ( {file} ) => {
  if (!file) { return <div>Please select a file.</div>}

  // let updatedContent = this.ref.content.value
  // console.log(updatedContent)
  const content = renderMarkdown(file.content);
  return (
    <div className="active-file">
      <h3>{file.fileName}</h3>
      <textarea onChange={updateOtherContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      <div className="file-content" dangerouslySetInnerHTML={content}/>
    </div>
  );
};
// onBlur={updatedContent.bind(this, file)}

const updateOtherContent = (file, event) => store.saveContent(file.fileName, event.target.value);
const updatedContent = (file, event) => store.saveContent(file.fileName, event.target.innerText);

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};


module.exports = ActiveFile;
