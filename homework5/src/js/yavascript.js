import $ from 'jquery';
import Storage from './modules/storage';

$(() => {
  const inputName = 'joke-input';
  const $input = $(`input[name="${inputName}"]`);
  const $jokeForm = $('form');
  const sampleJokes = [
    'Yo mama so fat I swerved to miss her and ran out of gas.',
    'Yo mama so ugly, her portraits hang themselves.',
    'Yo mama so unfamiliar with the gym she calls it James.',
    'Yo mama so fat her memory foam forgot.',
    'Yo mama so stupid, she thought LGBT was a sandwich.',
    'Yo mama so fat her patronus is a cake.',
    'Yo mama so fat, the Sorting Hat put her in the House of Pancakes.',
    'Yo mama so old, she knew Burger King when he was a prince.',
    'Yo mama so fat when she goes camping the bears hide their food.',
    'Yo mama so poor the ducks throw bread at her.'
  ];

  var renderJoke = function(joke) {
    $('.them-jokes').append('<li>' + joke + '</li>');
  }

  var addJoke = function(joke) {
    Storage.add(joke, inputName);
    renderJoke(joke);
  }

  var populateJokes = function() {
    const jokes = Storage.load(inputName);

    jokes.forEach((joke) => {
      renderJoke(joke);
    });
  };

  $('#add').click(function(e){
    e.preventDefault();
    let joke = $input.val();
    $input.val('');
    if (joke != '') {
      addJoke(joke);
    }
  });

  $('#add-sample-joke').click(function(e){
    const joke = sampleJokes[Math.floor(Math.random()*sampleJokes.length)]
    addJoke(joke);
  });

  $('#erase').click(function(){
    Storage.erase(inputName);
    $('.them-jokes').empty();
  });

  populateJokes();
});
