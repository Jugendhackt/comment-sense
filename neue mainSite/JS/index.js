document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("createAccount").addEventListener("click", function(){
    window.location.href = "signup.html";
  });
  document.getElementById("showAccount").addEventListener("click", function(){
    window.location.href = "signin.html";
  });

  const ipAdress = "192.168.2.110";

  function getTopWebsites(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://" + ipAdress + "/websites/top/", true);
    xhr.onload = function() {
      console.log(this.responseText);
    }
    xhr.send();
  }

  getTopWebsites();
});
