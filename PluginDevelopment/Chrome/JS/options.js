document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("button-save").addEventListener("click", sendsaveData);
	document.getElementById("button-clear").addEventListener("click", clearData);

	var ipAdress = '192.168.56.1'
	var port = "12345";

	function sendsaveData(){
		var username = document.getElementById("inputUserName").value;
		var password = document.getElementById("inputPassword").value;
		if(username == "" || password == "")
			document.getElementById("inputUserName").value = "Es sind nicht alle Felder ausgefüllt";
		else {
			//get Username or set it for the first time
			chrome.storage.sync.get(["username"], function(result){
			 if(typeof result.username === "undefined" || result.username == "")
				chrome.storage.sync.set({username: username});
			  });
			//get password or set it for the first time
			chrome.storage.sync.get(["password"], function(result){
			  if(typeof result.password === "undefined" || result.password == "")
					chrome.storage.sync.set({password: password});
			});
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://"+ipAdress + ":" + port + "/users/create/", true);
			xhr.onload = function(){
				data = xhr.responseText;
			}
			xhr.send(JSON.stringify({username: username, password: password}));
		}
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
