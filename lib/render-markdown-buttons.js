import sendGist from './send-gist';
import store from './store';
import React from 'react';

module.exports = (file) => {
  if (file.markdown) {
    return removeMarkdownButtons(file);
  } else {
    return addMarkdownButtons(file);
  }
};

const addMarkdownButtons = (file) => {
  return <div className="active-buttons"><button className="add-mark-down-btn" onClick={() => store.addMarkdown(file.id)}>Add Markdown</button></div>;
};

const removeMarkdownButtons = (file) => {
  return (
    <div className="active-buttons">
      <button className="remove-mark-down-btn" onClick={() => store.removeMarkdown(file.id)}>Remove Markdown</button>
      <button className="save-as-gist-btn" onClick={() => sendGist(file)} >Save as gist</button>
      {renderGistEmailLink(file)}
    </div>
  );
};

const renderGistEmailLink = (file) => {
  if (file.gist) {
    let mailLink = `mailto:?body=${file.gist}`;

    return <a href={mailLink}>Send Link as Email</a>;
  }
};
