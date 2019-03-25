document.addEventListener("DOMContentLoaded", function(){
  chrome.storage.sync.clear(function(){
    alert("triggered");
  });
});
