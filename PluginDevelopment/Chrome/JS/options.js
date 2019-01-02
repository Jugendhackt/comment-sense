document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("button-save").addEventListener("click", sendsaveData);
  document.getElementById("button-clear").addEventListener("click", clearData);
 console = chrome.extension.getBackgroundPage().console;
console.log("hello");
  function sendsaveData(){
      //document.getElementById("button-save").innerHTML = "123";
      var username = document.getElementById("inputUserName").value;
      var password = document.getElementById("inputPassword").value;
      //document.getElementById("button-save").innerHTML = password;

      if(username == "" || password == "")
        document.getElementById("inputUserName").value = "Es sind nicht alle Felder ausgefüllt";
      else {
        //get Username or set it for the first time
        chrome.storage.sync.get(["username"], function(result){
          if(typeof result.username === "undefined")
            chrome.storage.sync.set({username: username});
          });
        //get password or set it for the first time
        chrome.storage.sync.get(["password"], function(result){
          if(typeof result.password === "undefined")
            chrome.storage.sync.set({password: password});
        });
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://youip:yourport", true);
      xhr.onload = function(){
        data = xhr.responseText;
      }
      xhr.send("Your data");
  }


  function clearData(){
    chrome.storage.sync.set({username: ""});
    chrome.storage.sync.set({password: ""});
    var username = "";
    var password = "";
    document.getElementById("inputUserName").value = "";
    document.getElementById("inputPassword").value = "";
  }

});
