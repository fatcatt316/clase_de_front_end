$(function() {

  $('.ajax-it-up').on('click', function(event) {
    $('#resultz').html("<img src='loading_cat.gif'>");

    $.get({
      url: 'http://thecatapi.com/api/images/get.php?format=html&type=gif',
      dataType: 'html'
    }).always(function(data) {
      // Every response has an XML parsing error, so I'm using "always".
      // I think the API is messed up, but I couldn't find another cat gif one :(
      $('#resultz').html(data);
    });
  });

});
