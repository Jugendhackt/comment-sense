document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("createAcc").addEventListener("click", function() {
		window.location.href = "HTML/signup.html";
	});
	document.getElementById("setting").addEventListener("click", function() {
		createModalBox();
	});

	const ipAdress = "192.168.5.163";

    function setTopComments() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://" + ipAdress + "/comments/top/", true);
		xhr.onload = function() {
			if (this.status === 200) {
				var data = JSON.parse(this.responseText);
				console.log(data);

				for (var i = 0; i < data.Comments.length; i++) {
					document.getElementById("commentTitle" + i).textContent = data.Comments[i].headline;
					document.getElementById("commentContent" + i).textContent = data.Comments[i].content;
				}
			}
		}
		xhr.send();
	}

	setTopComments();

	function setTopWebsites() {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://" + ipAdress + "/sites/top/", true);
		xhr.onload = function() {
			if (this.status === 200){
				var data = JSON.parse(this.responseText);
				console.log(data);
				for (var i = 0; i < 4; i++) {
					var title;
					if(data.sites[i].url.substring(0, 7) == "http://")
						title = data.sites[i].url.substring(7, data.sites[i].url.length);
					else if (data.sites[i].url.substring(0, 8) == "https://")
						title = data.sites[i].url.substring(8, data.sites[i].url.length);
					title = title.substring(0, title.length-1);
					document.getElementById("websiteTitle" + i).textContent = title;
					document.getElementById("websiteVisitBtn" + i).addEventListener("click", function(){
						window.location.href = data.sites[this.id.substring(15, this.id.length)].url;
					});
				}
			}
		}
		xhr.send();
	}

	setTopWebsites();

	function createModalBox() {
		if (document.getElementById("modal") == null) {
			var design = localStorage.getItem("design");
			var modal = document.createElement("DIV");
			modal.id = "modal";

			if (design == null || design == "light")
				modal.style.backgroundColor = "lightgray";
			else if (design == "dark")
				modal.style.backgroundColor = "#292929";
			modal.classList.add("modal");
			modal.style.height = "500px";
			modal.style.width = "100vw";

			var label = document.createElement("LABEL");
			label.classList.add("label");
			label.textContent = "Design auswählen";
			modal.appendChild(label);

			var comboBox = document.createElement("SELECT");
			comboBox.id = "design";
			comboBox.classList.add("select");

			var light = document.createElement("OPTION");
			light.appendChild(document.createTextNode("hell"));
			light.value = "light";
			light.classList.add("option");
			comboBox.appendChild(light);

			var dark = document.createElement("OPTION");
			dark.appendChild(document.createTextNode("dunkel"));
			dark.value = "dark";
			dark.classList.add("option");
			comboBox.appendChild(dark);

			modal.appendChild(comboBox);

			if (design == null || design == "light")
				comboBox.selectedIndex = 0;
			else
				comboBox.selectedIndex = 1;

			var button = document.createElement("BUTTON");
			button.id = "save";
			button.textContent = "Speichern";
			button.classList.add("button");
			modal.appendChild(button);

			var a = document.createElement("a");
			a.id = "linkToIcon";
			a.classList.add("a");
			a.textContent = "Links are from: https://www.iconfinder.com/Chanut-is";
			a.href = "https://www.iconfinder.com/Chanut-is";
			modal.appendChild(a);

			document.getElementById("nav").appendChild(modal);
			document.getElementById("save").addEventListener("click", function() {
				localStorage.setItem("design", document.getElementById("design").value);
				window.location.reload();
			});

			window.onclick = function(event) {
				if (event.target.id != "save" && event.target.id != "setting" && event.target.id != "design") {
					modal.remove();
				}
			}

			modal.style.display = "flex";
		}
	}
});
