import store from './store';
import request from 'request';

module.exports = (file) => {
  request.post({
    url: 'https://api.github.com/gists',
    headers: {
      'User-Agent': 'Note Taker'
    },
    body: JSON.stringify({
      description: "Created with Note Taker",
      public: "true",
      files:{
        "note.markdown": {
          content: file.content
        }
      }
    })
  }, function (err, response, body) {
    if (err) {
    return new Notification('Error Publishing Your Note', {
      body: JSON.parse(err).message
    });
  }
  var gistUrl = JSON.parse(body).html_url;
  var notification = new Notification('Your Note Has Been Published', {
    body: `Click to open ${gistUrl} in your browser.`
  });

  notification.onclick = function () {
    electron.shell.openExternal(gistUrl);
  };
  store.saveGist(file.fileName, gistUrl);
  });
};
