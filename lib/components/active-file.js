import React from 'react';
import marked from 'marked';
import store from '../store'

const ActiveFile = ( {file} ) => {
  if (!file) { return <div>Please select a file or make a new note.</div>}

  const content = renderMarkdown(file.content);
  let markdownBox = <div className="file-content" dangerouslySetInnerHTML={content}/>
  let addMarkdownButton = <button className="add-mark-down-btn" onClick={() => store.addMarkdown(file.id)}>Add Markdown</button>
  let removeMarkdownButton = <button className="add-mark-down-btn" onClick={() => store.removeMarkdown(file.id)}>Remove Markdown</button>

  return (
    <div className="active-file">
      <h3>{file.fileName}</h3>
      {file.markdown ? removeMarkdownButton : addMarkdownButton}
      <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      {renderMarkdownBox(content, file)}
    </div>
  );
};

const updateContent = (file, event) => store.saveContent(file.id, event.target.value);

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};

const renderMarkdownBox = (content, file) => {
  if (file.markdown) {
    return <div className="file-content" dangerouslySetInnerHTML={content}/>
  }
}

module.exports = ActiveFile;
