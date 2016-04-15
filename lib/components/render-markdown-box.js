import React from 'react';
import marked from 'marked';

module.exports = (file) => {
  const content = renderMarkdown(file.content);

  if (file.markdown) {
    return <div className="file-content" dangerouslySetInnerHTML={content}/>;
  }
};

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};
