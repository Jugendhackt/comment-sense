document.addEventListener("DOMContentLoaded", function(){
	document.getElemts
	function basicDisplay(identifier, attribute) {
		$(identifier).css({display: attribute});
	}

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

	function fadeFooter(mode) {
		if (mode == 'basic') {
			$('footer').animate({ height: '76px' }, 350, function() {
				$('footer button[name="writeComment"]').show("slide", { direction: "left" }, 300);
			});
			animateFormfields('hide');
			$('form').css({
				display: 'block'
			});
			basicDisplay('.footer-overlay-close', 'none');
		} 
		else if (mode == 'extended') {
			// Hide ScrollDown button
			$('#scrollDown').hide();
			$('footer button[name="writeComment"]').hide("slide", { direction: "left" }, 300, function() {
				$('footer').animate({
					height: '450px'
				});
				animateFormfields('show');
			});
			basicDisplay('.footer-overlay-close', 'flex');
		}
	}

	// Write comment, slide up animation
	$('footer button').click(function() {
		fadeFooter('extended');
	});
	$('.footer-overlay-close').click(function() {
		fadeFooter('basic');
	});
});
