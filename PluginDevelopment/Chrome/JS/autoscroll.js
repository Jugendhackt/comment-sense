document.addEventListener("DOMContentLoaded", function(){
	$('#scrollDown').click(function() {
		$('#scrollDown').hide();
		$('html, body').animate({
			scrollTop: $("div.card:last-child").offset().top
		}, 600);
	});

	$(window).scroll(function(){
		$('#scrollDown').hide();
	});
});
