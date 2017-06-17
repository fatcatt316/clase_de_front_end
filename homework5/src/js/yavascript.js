import $ from 'jquery';
import Storage from './modules/storage';

$(() => {
  const inputName = 'joke-input';
  const $input = $(`input[name="${inputName}"]`);
  const $jokeForm = $('form');

  var renderJoke = function(joke) {
    $('.them-jokes').append('<li>' + joke + '</li>');
  }

  var populateJokes = function() {
    const jokes = Storage.load(inputName);

    jokes.forEach((joke) => {
      renderJoke(joke);
    });
  };

  $('#add').click(function(e){
    e.preventDefault();
    Storage.add($input.val(), inputName);
    renderJoke($input.val());
  });

  $('#erase').click(function(){
    Storage.erase(inputName);
    $('.them-jokes').empty();
  });

  populateJokes();
});
