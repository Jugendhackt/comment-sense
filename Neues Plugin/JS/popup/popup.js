document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("createComment").addEventListener("click", createComment);
	document.getElementById("back").addEventListener("click", back);
	document.getElementById("commentInput").style.display = "none";

	function back() {
		if (document.getElementById("commentInput").style.display != "none") {
			changeDisplay("commentInput", "none");
			changeDisplay("createCommentDiv", "block");
			changeHeight("footer", "40px");
		}
	}


	function createComment() {
		if (document.getElementById("commentInput").style.display == "none") {
			changeDisplay("commentInput", "flex");
			changeDisplay("createCommentDiv", "none");
			changeHeight("footer", "350px");
		}
	}

	function changeDisplay(id, display) {
		document.getElementById(id).style.display = display;
	}

	function changeHeight(id, height) {
		document.getElementById(id).style.height = height;
	}

});
