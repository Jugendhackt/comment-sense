document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("save").addEventListener("click", save);

	function save() {
		var design = document.getElementById("design").value;
		chrome.storage.local.set({
			design: design
		});
		console.log("saved");
	}

	function setData() {
		chrome.storage.local.get(["design"], function(result){
			if (result.design == "light" || typeof result.design == "undefined")
				document.getElementById("design").selectedIndex = 0;
			else if (result.design == "dark")
				document.getElementById("design").selectedIndex = 1;
		});
	}

	function setErr(str) {
		document.getElementById("error").textContent += str;
	}

	setData();
});