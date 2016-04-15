import React from 'react';
import marked from 'marked';
import store from '../store'
import sendGist from '../send-gist';
import renderMarkdownButtons from '../render-markdown-buttons';


const ActiveFile = ( {file} ) => {
  const content = renderMarkdown(file.content);

return (
    <div className="active-file">
      {renderMarkdownButtons(file)}
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
