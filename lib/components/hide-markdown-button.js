import sendGist from '../send-gist';
import store from '../store';
import React from 'react';
import GistEmailLink from './gist-email-link';

module.exports = (file) => {
  return (
    <div className="active-buttons">
      <button className="remove-mark-down-btn" onClick={() => store.removeMarkdown(file.id)}>Hide Markdown</button>
      <button className="save-as-gist-btn" onClick={() => sendGist(file)} >Save as Gist</button>
      <GistEmailLink {...file} />
    </div>
  );
};
