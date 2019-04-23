document.addEventListener("DOMContentLoaded", function(){
	const ipAdress = "192.168.2.110";
	
	
	function getUserData() {
		chrome.storage.local.get(["userName", "password", "time"], function(result){
			var date = new Date();
			if (typeof result.userName == "undefined" || typeof result.password == "undefined") {
				window.location.href="../../HTML/login/login.html";
			} else if(result.time < date.getTime()) {
				chrome.storage.local.remove(["userName", "password", "time"], function(){
					window.location.href="../../HTML/login/login.html";
				});
			} else {
				var xhr = new XMLHttpRequest();
				xhr.open("POST", "http://" + ipAdress + "/users/login/", true);
				xhr.onload = function() {
					var data = JSON.parse(this.responseText);
					if (this.status !== 200 && data.status != "login data valid"){
						window.location.href = "../../HTML/login/login.html";
					}
				}
				xhr.send(JSON.stringify({
					userName: result.userName,
					password: result.password
				}));
			} 
		});
	}

	getUserData();
});