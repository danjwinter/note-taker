import store from '../store';
import React from 'react';

module.exports = (file) => {
  return <div className="active-buttons"><button className="add-mark-down-btn" onClick={() => store.addMarkdown(file.id)}>Show Rendered Markdown</button></div>;
};
