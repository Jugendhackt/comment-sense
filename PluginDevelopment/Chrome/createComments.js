$(document).ready(function() {

  function displayComment(author, headline, comment, liked) {
    console.log('Author: ' + author + ', Headline: ' + headline + ', Comment: ' + comment + ', Liked: ' + liked);
    $('#landingpage').append('<div class="card" style="width: 18rem;"> <div class="card-header"> <div class="flex-centered-vertically"> <span class="profile-image"> <img src="./assets/icons/user.svg" alt=""> </span> <h5 class="card-title">' + author + '</h5> </div> <p class="card-title-description">Liked ' + liked + ' times</p> </div> <div class="card-body"> <h6 class="card-subtitle mb-2 text-muted">' + headline + '</h6> <p class="card-text">' + comment + '</p> <button type="button" class="btn btn-primary btn-sm"> <span class="like"> <img src="./assets/icons/like.svg" alt=""> </span> Gefällt mir </button> </div> </div>');
    if ($('footer').css('height') == '450px') {
      $('#scrollDown').addClass('visible');
    } else {
      $('#scrollDown').show();
    }
  }

  function startInterval(comment_information) {
    var colors = [];
    var random_color = Math.floor(Math.random() * 5) + 1;
    var random_delay = Math.floor(Math.random() * 10000) + 5000;
    let interval = setInterval(function () {
      displayComment(comment_information[0], comment_information[1], comment_information[2], comment_information[3]);
      clearInterval(interval);
    }, random_delay);
  }

  let comments = [
    ["Peter", "Richtig interessant!", "Some quick example text to build on the card title and make up the bulk of the card's content.", "12"],
    ["Mara", "Top code!", "Some quick example text to build on the card title and make up the bulk of the card's content.", "14"],
    ["Lara", "Cooler code!", "Some quick example text to build on the card title and make up the bulk of the card's content.", "4"],
    ["Darius", "Kann ich nur empfehlen!", "Some quick example text to build on the card title and make up the bulk of the card's content.", "7"]
  ]

  startInterval(comments[0]);
  startInterval(comments[1]);



});
