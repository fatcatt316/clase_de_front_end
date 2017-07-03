import './styles/base.scss';
import $ from 'jquery';

console.info('Hey! Quit looking at the console.');

$(function(){
  var link = function(anchor, url) {
    return '<a href="'+ url +'" target="_blank">'+ anchor +'</a>';
  }

  var populateGithubInfo = function(githubName) {
    let githubAPIUrl;
    const results = $('#github-results');

    if (githubName) {
      githubAPIUrl = 'https://api.github.com/users/' + githubName
    // TODO: If provided name, search for that user
    // } else if (name) {
    //   githubAPIUrl = 'https://api.github.com/users/' + githubName
    // https://developer.github.com/v3/search/#search-users
    } else {
      return $('#github-results').html('NO RESULTS');
    }

    $.ajax({
      url: githubAPIUrl
    }).then((resp) => {
      console.log(resp);
      results.html(''); // Clear previous results
      results.append('<img src="'+ resp.avatar_url +'" class="github-avatar" />');

      const anchorText = (resp.name ? resp.name : "Github URL");
      results.append('<p>'+ link(anchorText, resp.html_url) +'</p>');

      if (resp.location) {
        results.append('<p>'+ resp.location +'</p>');
      }
      if(resp.blog) {
        results.append('<p>'+ link("Personal website", resp.blog) +'</p>');
      }
    }).catch((err) => {
      err.statusText
      results.html(err.statusText);
    });
  };

  $("form").submit(function(e) {
    const name = $('input[name="name"]').val();
    const city = $('input[name="city"]').val();
    const githubName = $('input[name="github-name"]').val();
    populateGithubInfo(githubName);

    e.preventDefault();
  });





  $("#name").focus();
});


// $('#add').click(function(e){
//   e.preventDefault();
//   let joke = $input.val();
//   $input.val('');
//   if (joke != '') {
//     addJoke(joke);
//   }
// });

// $('#add-sample-joke').click(function(e){
//   const joke = sampleJokes[Math.floor(Math.random()*sampleJokes.length)]
//   addJoke(joke);
// });

// $('#erase').click(function(){
//   Storage.erase(inputName);
//   $('.them-jokes').empty();
// });
