document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("showHidePassword").addEventListener("click", showHidePassword);
  document.getElementById("save").addEventListener("click", saveOptions);
  document.getElementById("savePassword").addEventListener("click", savePassword);

  var inputusername = document.getElementById("inputUserName");
  var inputpassword = document.getElementById("inputPassword");
  var inputpassword2 = document.getElementById("inputPasswordSec");
  var inputemail = document.getElementById("inputEmail");
  var error = document.getElementById("error");

  var ipAdress = "192.168.2.113";


  function showOptions(){
    chrome.storage.sync.get(["username"], function(result){
      if(typeof result.username === "undefined"){
        error.innerHTML += "Nickname existiert nicht!";
      } else {
        inputusername.value = result.username;
      }
    });

    chrome.storage.sync.get(["password"], function(result){
      if(typeof result.password === "undefined"){
        error.innerHTML += "Passwort existiert nicht!";
      } else {
        inputpassword.value = result.password;
        inputpassword2.value = result.password;
      }
    });

    chrome.storage.sync.get(["email"], function(result){
      if(typeof result.email === "undefined"){
        error.innerHTML += "Keine Email hinterlegt!";
      } else {
        inputemail.value = result.email;
      }
    });
  }



  function saveOptions(){
    var username = inputusername.value;
    var password = inputpassword.value;
    var email = inputemail.value;

    if(inputpassword.value == inputpassword2.value && inputpassword.value != "" && inputpassword2 != ""){
      if (email == ""){
        chrome.storage.sync.set({username: username});
        chrome.storage.sync.set({password: password});
      } else {
        chrome.storage.sync.set({username: username});
        chrome.storage.sync.set({password: password});
        chrome.storage.sync.set({email: email});
        chrome.storage.sync.set({PasswordState: false});
      }
      window.location.href = "../HTML/showoptions.html";
    } else {
      error.innerHTML =+ "Passwörter nicht gleich";
    }
  }

  function showHidePassword(){
    if(inputpassword.type == "text") {
      inputpassword.type = "password";
      inputpassword2.type = "password";
    } else {
      inputpassword.type = "text";
      inputpassword2.type = "text";
    }
  }

  function savePassword(){
    chrome.storage.sync.get(["PasswordState"], function(result){
      if(result.PasswordState == true){
        chrome.storage.sync.set({PasswordState: false});
      } else {
        chrome.storage.sync.set({PasswordState: true});
      }
    });
  }

  function sendData(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
      if(this.status === 200){
        console.log(this.responseText);
      } else {
        alert(this.status);
      }
    }
    xhr.open("POST", ipAdress, true);
    xhr.send();
  }

  showOptions();
});
