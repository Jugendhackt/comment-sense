$(document).ready(function() {
	function animateFormfields(mode) {
		let fields = ['.form-description h1', '.form-description p', '.form-description hr', 'div.form-group:nth-of-type(2)', 'div.form-group:nth-of-type(3)', 'div.form-group:nth-of-type(4)', '.footer-overlay #submit'];
		if (mode == 'show') {
			var index = 0;
			let inserter = setInterval(function() {
				$(fields[index]).fadeIn();
				index++;
				if (index == 7) {
					clearInterval(inserter);
				}
			}, 150);
		} 
		else {
			for (var i = 0; i < fields.length; i++) {
				$(fields[i]).hide();
			}
		}
	}

	var allComments = $('#landingpage').children();

	function fadeFooter(mode) {
		if (mode == 'basic') {
			$('.footer-overlay form').hide('slide', {
				direction: 'down'
			}, 200);
			$('footer').animate({
				height: '76px'
			}, 250, function() {
				$('footer button[name="writeComment"]').show("slide", { direction: "left" }, 300);
			});
			$('.footer-overlay-close').hide();
			if ($('#landingpage').children() != allComments) {
				$('#scrollDown').show();
			}
		}
	}

	function displayComment(author, headline, comment, liked) {
		$('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Gefällt ' + liked + ' mal</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm"> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
	}
	
	$("form#postComment").submit(function(event) {
		fadeFooter('basic');
	});
});
