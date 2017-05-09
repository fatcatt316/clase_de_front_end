$(function() {

  // TODO: Put it inside an IIFE or one of them namespaced things
  $('.ajax-it-up').on('click', function(event) {
    var _this = this;

    $.ajax({
      url: 'http://swapi.co/api/people/1',
      method: 'GET',
    }).then(function(data) {
      console.log(data);
      $('#resultz').html()
    }).catch(function(err) {
      // try bad endpoint, see an error
      console.log('we got an error!');
      console.log(err);
    });
  });

});


// https://www.programmableweb.com/category/humor/apis?category=19997
