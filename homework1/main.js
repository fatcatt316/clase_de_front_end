// Change eyes when shoots
// play noise when shoots
// shoot laser
// smoke and fire

$(document).ready(function() {
  var shotty = $('#shotty');

  $(window).click(function(e) {
    shotty[0].play();
  });
});
