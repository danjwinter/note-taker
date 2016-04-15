import { readFileSync } from 'fs';

module.exports = () => {
  const savedFiles = JSON.parse(localStorage.getItem('files')) || [];
  return savedFiles.map(file => {
    try {
      const newContent = readFileSync(file.fileName).toString();
      return Object.assign(file, { content: newContent});
    } catch (e) {
      if (e.message.includes('ENOENT')) {return undefined;}
      throw e;
    }
  }).filter(file => file);
};
