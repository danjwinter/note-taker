import React from 'react';
import RenderMarkDownButton from './render-markdown-button';
import HideMarkdownButton from './hide-markdown-button';

module.exports = (file) => {
  if (file.markdown) {
    return <HideMarkdownButton {...file} />;
  } else {
    return <RenderMarkDownButton {...file}/>;
  }
};
