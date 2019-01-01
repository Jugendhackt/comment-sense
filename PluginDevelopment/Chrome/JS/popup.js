document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("submit").addEventListener("click", sendData);
  document.getElemts
  function basicDisplay(identifier, attribute) {
    $(identifier).css({
      display: attribute
    });
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
    // });
  }); 
  $('.footer-overlay-close').click(function() {
    fadeFooter('basic');
  });

  function sendData() {
    var nickname = document.getElementById("nicknameInput").value;
    var headline = document.getElementById("headlineInput").value;
    var comment = document.getElementById("commentInput").value;

    if(nickname == "" || headline == "" || comment == ""){
      alert("Es sind nicht alle Felder ausgefüllt!");
    } else {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      //alert(tabs[0].url);
      var url = tabs[0].url;
      var xhr = new XMLHttpRequest();
      // let hash = getHash();
      // console.log('Hash: ' + hash);
      xhr.open('POST', 'http://192.168.2.114:12345/comments/', true);
      // xhr.setRequestHeader('Content-type', 'application/commentSense');
      xhr.onload = function () {
        console.log(xhr.responseText);
      };
      //xhr.send('{\"userName\":\"'+nickname+'\",\"password\":\"password4\",\"headline\":\"'+headline+'\",\"comment\":\"'+comment+'\",\"url\":\"'+url+'\"}');
      xhr.send(JSON.stringify({userName: nickname.toString(), password: "password4", headline: headline.toString(), url: url.toString()}));
        //alert("Hi");
    });
  }
}

});
