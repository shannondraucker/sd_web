var activeDiv = 'home';
var teaching_dd_active = false;
var research_dd_active = false;

var backgroundImages = ['DSC_0069.jpg', 'IMG_1820.jpg', 'IMG_4216.jpg', 'Photo Jul 22, 12 05 38 PM.jpg', 'IMG_4193.jpg', 'Photo Jul 16, 7 43 04 PM.jpg'];

$(document).ready(function(){
  var backgroundImages_selected = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
  $(".hero.is-info").css({
    'background': "linear-gradient(rgba(0, 0, 0, 0.65),rgba(0, 0, 0, 0.65)), url('images/backgrounds/"+backgroundImages_selected+"') no-repeat center center fixed",
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover'
  });

  // Transition effect for navbar
  $(window).scroll(function() {
    // checks if window is scrolled more than 500px, adds/removes solid class
    if($(this).scrollTop() > 30) {
      console.log("attaching");
        $('.navbar').addClass('solid');
    } else {
      console.log("removing");
        $('.navbar').removeClass('solid');
    }
  });

});


function toggleDiv(to, dropdownItem){
  if (to.trim() !== activeDiv.trim()){
    $('#'+activeDiv).hide();
    $('#'+to).fadeIn(1200);
console.log(activeDiv);
    $('#button-'+activeDiv).removeClass('is-focused');
    $(".dropdown").removeClass("is-active");


    $('#button-'+to).addClass('is-focused');

    $(".dropdown-item").removeClass("is-active");

    activeDiv = to;

    if ($(window).width() <= 900){
      $(".burger").click();
    }

    if (dropdownItem){
      var toParent = to.substr(0, to.indexOf('-'));
      $("#button-"+toParent).focus();
      $("#dd-"+to).addClass("is-active");
    }
  } else if (dropdownItem) {
    var toParent = to.substr(0, to.indexOf('-'));
    $("#button-"+toParent).focus();
    $(".dropdown").removeClass("is-active");
  }
}

function dropdownNav(to){

  if ($("#"+to+"_dropdown").hasClass("is-active")) {
    $('#button-'+to).blur();
    $(".dropdown").removeClass("is-active");
  } else {
    $(".dropdown").removeClass("is-active");
    $("#"+to+"_dropdown").addClass("is-active");
  }
  event.stopPropagation();
}

$(document).click(function() {
    $(".dropdown").removeClass("is-active");
});

// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('#'+burger.dataset.target);
    burger.addEventListener('click', function() {
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');

        if (menu.classList.contains('is-active')){
          $(".navbar").css("background-color", "rgba(32,32,32,0.65)");
        } else {
          $(".navbar").css("background-color", "transparent");
        }
    });
})();

window.addEventListener('resize', function(event){
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#'+burger.dataset.target);
  if ($(window).width() > 900){
    menu.classList.remove('is-active');
    burger.classList.remove('is-active');

    if (menu.classList.contains('is-active')){
      $(".navbar").css("background-color", "rgba(32,32,32,0.65)");
    } else {
      $(".navbar").css("background-color", "transparent");
    }
  }

    /* swap buttons to horizontal bars */
    // if ($(window).width() <= 768){
    //   $("#button-about").removeClass("button");
    //   $("#button-cv").removeClass("button");
    //   $("#button-teaching").removeClass("button");
    //   $("#button-contact").removeClass("button");
    //
    // }
});
