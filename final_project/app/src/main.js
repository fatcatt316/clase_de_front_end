import './styles/base.scss';
import $ from 'jquery';

console.info('Hey! Quit looking at the console.');

var millisecondsToShow = 800;

$(function(){
  var link = function(anchor, url) {
    return '<a href="'+ url +'" target="_blank">'+ anchor +'</a>';
  }

  // var populateGoogleInfo = function(name, city) {
  //   const resultDiv = $('#google-results');
  //   alert("ABOUT TO HIT LOCAL SERVER");

  //   $.ajax({
  //     url: `/google-results?city=${city}&name=${name}`,
  //     // data: {
  //     //   city: city,
  //     //   name: name
  //     // },
  //     // headers: {
  //     //   'Content-Type': 'application/json',
  //     // }
  //   }).then((resp) => {
  //     console.log("GOT RESPONSE...");
  //     console.log(resp);
  //   }).catch((err) => {
  //     console.log("ERROR!!!!!");
  //     console.log(err);
  //     resultDiv.html(err.statusText);
  //   });
  // }

  var populateGithubInfo = function(githubName) {
    let githubAPIUrl;
    const resultDiv = $('#github-results');

    if (githubName) {
      githubAPIUrl = 'https://api.github.com/users/' + githubName;
    // TODO: If provided name, search for that user
    // } else if (name) {
    //   githubAPIUrl = 'https://api.github.com/users/' + githubName
    // https://developer.github.com/v3/search/#search-users
    } else {
      return resultDiv.html('NO RESULTS');
    }
    resultDiv.hide();

    $.ajax({
      url: githubAPIUrl
    }).then((resp) => {
      resultDiv.html(''); // Clear previous results
      resultDiv.append('<img src="'+ resp.avatar_url +'" class="github-avatar" />');

      const anchorText = (resp.name ? resp.name : "Github URL");
      resultDiv.append('<p>'+ link(anchorText, resp.html_url) +'</p>');

      resultDiv.append('<p>Github User since '+ resp.created_at +'</p>');

      if (resp.company) {
        resultDiv.append('<p>Company: '+ resp.company +'</p>');
      }
      if (resp.location) {
        resultDiv.append('<p>'+ resp.location +'</p>');
      }
      if(resp.blog) {
        resultDiv.append('<p>'+ link("Personal website", resp.blog) +'</p>');
      }
      resultDiv.append('<p>'+ resp.followers +' Github Followers</p>');
      resultDiv.append('<p>Following '+ resp.following +' Github users</p>');
    }).catch((err) => {
      resultDiv.html(err.statusText);
    });
    resultDiv.show(millisecondsToShow);
  };

  $("form").submit(function(e) {
    // const name = $('input[name="name"]').val();
    // const city = $('input[name="city"]').val();
    const githubName = $('input[name="github-name"]').val();
    populateGithubInfo(githubName);
    // populateGoogleInfo(name, city);

    e.preventDefault();
  });

  $("#name").focus();
});
