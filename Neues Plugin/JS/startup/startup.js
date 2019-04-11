document.addEventListener("DOMContentLoaded", function(){
	
	function getUserData() {
		chrome.storage.local.get(["userName", "password", "time"], function(result){
			var date = new Date();
			if (typeof result.userName == "undefined" || typeof result.password == "undefined") {
				window.location.href="../../HTML/login/login.html";
			} else if(result.time < date.getTime()) {
				chrome.storage.local.remove(["userName", "password", "time"], function(){
					window.location.href="../../HTML/login/login.html";
				});
			}
		});
	}
	
	getUserData();
});