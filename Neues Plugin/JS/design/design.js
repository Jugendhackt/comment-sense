document.addEventListener("DOMContentLoaded", function(){

	function getData() {
		chrome.storage.local.get(["design"], function(result){
			if (typeof result.design == "undefined" || result.design == "light")
				loadJSCSSFile("../../CSS/design/light.css", "css");
			else if (result.design == "dark")
				loadJSCSSFile("../../CSS/design/dark.css", "css");
		});
	}

	function loadJSCSSFile(filename, filetype) {
		if (filetype == "js") {
			var fileref = document.createElement('script');
			fileref.setAttribute("type", "text/javascript");
			fileref.setAttribute("src", filename);
		} else if (filetype == "css") {
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", filename);
		}
		if (typeof fileref != "undefined")
			document.getElementsByTagName("head")[0].appendChild(fileref);
	}

	getData();


});