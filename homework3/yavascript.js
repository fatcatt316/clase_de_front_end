$(function() {

  var initializeRequest = function(button) {
    $('#resultz').html("<img src='loading_cat.gif'>");
    button.prop('disabled', true);
  }

  $('.ajax-it-up').on('click', function(event) {
    initializeRequest($(event.target));

    $.get({
      url: 'http://thecatapi.com/api/images/get.php?format=html&type=gif',
      dataType: 'html'
    }).always(function(data) {
      // Every response has an XML parsing error, so I'm using "always".
      // I think the API is messed up, but I couldn't find another cat gif one :(
      $('#resultz').html(data);
      $(event.target).prop('disabled', false);
    });
  });

});
