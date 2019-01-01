$(document).ready(function() {
  $('#scrollDown').click(function() {
    $('#scrollDown').hide();
    $('html, body').animate({
      scrollTop: $("div.card:last-child").offset().top
    }, 600);
  });
});
