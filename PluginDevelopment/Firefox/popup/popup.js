$(document).ready(function() {

  function basicDisplay(identifier, attribute) {
    $(identifier).css({
      display: attribute
    });
  }

  function animateFormfields(mode) {
    let fields = ['.form-description h1', '.form-description p', '.form-description hr', 'div.form-group:nth-of-type(2)', 'div.form-group:nth-of-type(3)', '.footer-overlay #submit'];
    if (mode == 'show') {
      var index = 0;
      let inserter = setInterval(function() {
        $(fields[index]).fadeIn();
        index++;
        if (index == 6) {
          clearInterval(inserter);
        }
      }, 150);
    } else {
      for (var i = 0; i < fields.length; i++) {
        $(fields[i]).hide();
      }
    }
  }

  function fadeFooter(mode) {
    if (mode == 'basic') {
      console.log('Display: ' + $('.footer-overlay form').css('display'));
            $('.footer-overlay form').hide('slide', {
              direction: 'down'
            }, 200);
      console.log('Display: ' + $('.footer-overlay form').css('display'));
      $('footer').animate({
        height: '76px'
      }, 350, function() {
        $('footer button[name="writeComment"]').show("slide", { direction: "left" }, 300);
      });
      animateFormfields('hide');
            $('form').css({
              display: 'block'
            });
      console.log('Display: ' + $('.footer-overlay form').css('display'));
      // basicDisplay('.footer-overlay form', 'block !important');
      basicDisplay('.footer-overlay-close', 'none');
      console.log('Display: ' + $('.footer-overlay form').css('display'));
    } else if (mode == 'extended') {
      $('footer button[name="writeComment"]').hide("slide", { direction: "left" }, 300, function() {
        $('footer').animate({
          height: '400px'
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

  function onGot(tabInfo) {
    console.log(tabInfo);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var gettingCurrent = browser.tabs.getCurrent();
  gettingCurrent.then(onGot, onError);
  console.log(window);
});
