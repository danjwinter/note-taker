import React from 'react';
import marked from 'marked';
import store from '../store'
import request from 'request';

const ActiveFile = ( {file} ) => {
  if (!file) { return <div>Please select a file.</div>}

  const content = renderMarkdown(file.content);
  // let markdownBox = <div className="file-content" dangerouslySetInnerHTML={content}/>
  // let addMarkdownButton = <button className="add-mark-down-btn" onClick={() => store.addMarkdown(file.fileName)}>Add Markdown</button>
  // let removeMarkdownButton = <button className="add-mark-down-btn" onClick={() => store.removeMarkdown(file.fileName)}>Remove Markdown</button>
return (
    <div className="active-file">
      <h3>{file.fileName}</h3>
      {renderMarkdownButtons(file)}
      <textarea onChange={updateContent.bind(this, file)} className="raw-file-content" value={file.content}></textarea>
      {renderMarkdownBox(content, file)}
    </div>
  );
};

const sendGist = (file) => {
  request.post({
    url: 'https://api.github.com/gists',
    headers: {
      'User-Agent': 'Note Taker'
    },
    body: JSON.stringify({
      description: "Created with Note Taker",
      public: "true",
      files:{
        "note.txt": {
          content: file.content
        }
      }
    })
  }, function (err, response, body) {
    if (err) {
    return new Notification('Error Publishing Your Clipping', {
      body: JSON.parse(err).message
    });
  }

  var gistUrl = JSON.parse(body).html_url;
  var notification = new Notification('Your Clipping Has Been Published', {
    body: `Click to open ${gistUrl} in your browser.`
  });

  notification.onclick = function () {
    electron.shell.openExternal(gistUrl);
  };
  store.saveGist(file.fileName, gistUrl)
  // clipboard.writeText(gistUrl);

  });
// });
}

const renderMarkdownButtons = (file) => {
  if (file.markdown) {
    return removeMarkdownButtons(file);
  } else {
    return addMarkdownButtons(file);
  }
};

const addMarkdownButtons = (file) => {
  return <button className="add-mark-down-btn" onClick={() => store.addMarkdown(file.fileName)}>Add Markdown</button>
};

const removeMarkdownButtons = (file) => {
  return (
    <div>
      <button className="add-mark-down-btn" onClick={() => store.removeMarkdown(file.fileName)}>Remove Markdown</button>
      <button className="save-as-gist-btn" onClick={() => sendGist(file)} >Save as gist</button>
      {renderGistEmailLink(file)}
    </div>
  )
};

const renderGistEmailLink = (file) => {
  if (file.gist) {
    let mailLink = `mailto:?body=${file.gist}`

    return <a href={mailLink}>Send Link as Email</a>
  }
}

const updateContent = (file, event) => store.saveContent(file.fileName, event.target.value);

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};

const renderMarkdownBox = (content, file) => {
  if (file.markdown) {
    return <div className="file-content" dangerouslySetInnerHTML={content}/>
  }
}

module.exports = ActiveFile;
