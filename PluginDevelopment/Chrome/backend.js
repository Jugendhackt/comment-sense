$(document).ready(function() {

function getHash(url) {
  // Get URL
  var query = { active: true, currentWindow: true };
  console.log(query);
  // Create hash
  return url.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}


function sendRequest(nickname, headline, content) {
  console.log("hallo welt");
  var xhr = new XMLHttpRequest();
  // let hash = getHash();
  // console.log('Hash: ' + hash);
  xhr.open('POST', 'http://localhost:12345/comments/', true);
  // xhr.setRequestHeader('Content-type', 'application/commentSense');
  xhr.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xhr.send('{\"userName\":\"User2\",\"password\":\"password2\",\"headline\":\"Header\",\"comment\":\"this is the comment\",\"hash\":\"hash1\"}');
}

 sendRequest('nickname', 'headline', 'comment');

  //console.log(chrome.tabs.getCurrent(console.log(this)));
});
