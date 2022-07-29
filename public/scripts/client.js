/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  console.log($(`form`).length);

  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  };

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweets) {
    // refresh the container
    $("#tweet-section").empty();
    // loops through tweets
    console.log(tweets);
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet

      const tweetElement = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $("#tweet-section").prepend(tweetElement);
    }
  };

  const createTweetElement = function (tweet) {
    let $tweet = `
  <article class="tweet">
          <header class="tweet-header">
            <div class="user-info-container">
              <img class="user-icon" src="${tweet.user.avatars}" />
              <p class= "user-name">${tweet.user.name}</p>
            </div>
            <div class="user-handle-container">
              <p class= "user-handle">${tweet.user.handle}</p>
            </div>
          </header>
          <div class="tweet-container">
            <form class="tweet-form">
              <p for="tweet-text" id="tweet-content">${tweet.content.text}</p>
            </form>
          </div>
          <footer>
            <div class="date-container">
              <p class="tweet-period">${timeago.format(tweet.created_at)}</p>
            </div>

            <div class="icons-container">
              <a class="icons-link" href="/tweeter/public/index.html">
                <i class="fa-solid fa-flag"></i> &nbsp;
                <i class="fa-solid fa-retweet"></i> &nbsp;
                <i class="fa-solid fa-heart"></i>
              </a>
            </div>
          </footer>
        </article>
  `;
    return $tweet;
  };

  const loadTweets = function () {
    // $get("/tweets")
    // .then(data => {
    //   $('textarea').val('')
    //   renderTweets(data)

    // })

    $.ajax("/tweets/", { method: "GET" }).then(function (data) {
      renderTweets(data);
      console.log("Success!");
    });
  };

  loadTweets();

  $(function () {
    // send new tweets to server
    const $form = $(".new-tweet form");
    $form.on("submit", function (event) {
      console.log("form submitted, performing ajax call..."); //TEST CODE FOR DEBUGGING
      event.preventDefault();
      const queryString = $(this).serialize();
      const tweetLength = $("#tweet-text").val().length;
      const tweetVal = $("#tweet-text").val();
      console.log(queryString); //TEST CODE FOR DEBUGGING
      if (tweetLength > 140) {
        $(".warning-msg").text("Error! Tweet exceeds character limit");
        $(".error-message-container").slideDown();
        return false;
      } else if (tweetLength === 0) {
        $(".warning-msg").text("Error! Tweet is empty! Please enter tweet");
        $(".error-message-container").slideDown();
        return false;
      } else if (tweetLength <= 140) {
        $(".error-message-container").slideUp();
      }
      $.ajax("/tweets/", { method: "POST", data: queryString }).then(
        function () {
          // $("#tweet-section").empty();
          $("#tweet-text").val("");
          $("#counter").text(140);
          $(".error-message-container").slideUp();
          loadTweets();
        }
      );
    });
  });
});
