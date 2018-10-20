$(document).ready(function() {

  function basicDisplay(identifier, attribute) {
    $(identifier).css({
      display: attribute
    });
  }

  function animateForm(mode) {
    if (mode == "show") {
      let fields = ['.form-description h1', '.form-description p', '.form-description hr', '.form-group:nth-child(1)', '.form-group:nth-child(2)', '.form-check', '.footer-overlay #submit'];
      var index = 0;
      let inserter = setInterval(function() {
        $(fields[index]).fadeIn();
        index++;
        if (index == 7) {
          clearInterval(inserter);
        }
      }, 200);
    } else {
      let fields = ['.form-description h1', '.form-description p', '.form-description hr', '.form-group:nth-child(1)', '.form-group:nth-child(2)', '.form-check', '.footer-overlay #submit'];
      var index = 0;
      let inserter = setInterval(function() {
        $(fields[index]).fadeOut();
        index++;
        if (index == 7) {
          clearInterval(inserter);
        }
      }, 200);
    }
  }

  function fadeFooter(mode) {
    if (mode == 'basic') {
      $('footer').animate({
        height: '76px'
      }, 300, function() {
        $('footer button[name="writeComment"]').show("slide", { direction: "left" }, 300);
        animateForm('hide');
      });
      basicDisplay('.footer-overlay-close', 'none');
    } else if (mode == 'extended') {
      $('footer button[name="writeComment"]').hide("slide", { direction: "left" }, 300, function() {
        $('footer').animate({
          height: '400px'
        });
        animateForm('show');
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
