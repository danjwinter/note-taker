import React from 'react';
import path from 'path';

module.exports = (file) => {
  if (file) {
    const fileName = path.basename(file.fileName);

    return (
      <h3>{fileName}</h3>
    );
  }
};
