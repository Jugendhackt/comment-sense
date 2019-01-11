$(document).ready(function() {
	function displayComment(author, headline, comment, liked) {
		$('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Gefällt ' + liked + ' mal</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm"> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
		if ($('footer').css('height') == '450px') {
			$('#scrollDown').addClass('visible');
		} 
		else {
			$('#scrollDown').show();
		}
	}
});
