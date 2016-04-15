import React from 'react';

module.exports = (file) => {
  if (file.gist) {
    let mailLink = `mailto:?body=${file.gist}`;

    return <a href={mailLink}><button>Send Gist Link as Email</button></a>;
  } else {
    return null;
  }
};
