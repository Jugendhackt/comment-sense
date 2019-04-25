document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("createAcc").addEventListener("click", function(){
		window.location.href = "signup.html";
	});

	const ipAdress = "192.168.2.110";

	function setTopComments() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
		xhr.onload = function() {
			console.log(this.responseText);
		}
		xhr.send();
	}

	function setTopWebsites() {
		var data = JSON.parse(getXhrData("/sites/top/", true)); 
	}
	
	setTopComments();
});