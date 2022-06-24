const URL = "http://localhost:3000/tweets";

const onEnter = (event) => {
  if (event.key == "Enter") {
    getTwitterData();
  }
};
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
  const input = document.querySelector("#user-search-input").value;
  if (!input) return;
  const encordedInput = encodeURIComponent(input);
  const url = `${URL}?q=${encordedInput}&count=50`;
  fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(function (response) {
      return response.json();

      // Your code for handling the data you get from the API
    })
    .then((data) => {
      buildTweets(data.statuses);
    });
};

const displayTwitterData = () => {
  const sampleData = [
    "Tesla",
    "formula1",
    "mountains",
    "school",
    "coding",
    "python",
    "javascript",
  ];
  const sampleInput = sampleData[Math.floor(Math.random() * 10)];
  const url = `${URL}?q=${sampleInput}&count=100`;
  fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(function (response) {
      return response.json();

      // Your code for handling the data you get from the API
    })
    .then((data) => {
      buildTweets(data.statuses);
    });
};

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {};

const displayTrends = () => {
  const url = "https://api.twitter.com/1.1/trends/place.json?id=1";
  fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then(function (response) {
      // return response.json();
      console.log(response);

      // Your code for handling the data you get from the API
    });
};
/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {};

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
  let twitterContent = "";
  tweets.map((tweet) => {
    const createdDate = moment(tweet.created_at).fromNow();
    twitterContent += `
        <div class="tweet-container">
            <div class="user-profile" style="background-image: url(${tweet.user.profile_image_url_https});"></div>
            <div class="complete-tweet">
              <div class="tweet-user-info">
                <div class="full-name">
                ${tweet.user.name}
                </div>
                <div class="user-name">
                @${tweet.user.screen_name}
                </div>
                <div class="tweet-date-container"><span>.</span>${createdDate}</div>
              </div>

              <div class="tweet-text-container">
                ${tweet.full_text}
              </div>
    `;

    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      twitterContent += buildImages(tweet.extended_entities.media);
      twitterContent += buildVideo(tweet.extended_entities.media);
    }

    twitterContent += `    
              <div class="tweet-actions">
                <div class="comment"><i class="far fa-comment"></i></div>
                <div class="retweet"><i class="fas fa-retweet"></i></div>
                <div class="react"><i class="far fa-heart"></i></div>
                <div class="share">
                  <i class="fas fa-external-link-alt"></i>
                </div>
              </div>

            
            </div>
          </div>
        `;
  });

  document.querySelector(".tweets-list").innerHTML = twitterContent;
};

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
  let imagesContent = `<div class="tweet-images-container">`;
  let imageExists = false;
  mediaList.map((media) => {
    if (media.type == "photo") {
      imageExists = true;
      imagesContent += `<div class="tweet-image" style="background-image: url(${media.media_url_https});"></div>`;
    }
  });
  imagesContent += `</div>`;
  return imageExists ? imagesContent : "";
};

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
  let videoContent = `<div class="tweet-video-container">`;
  let videoExists = false;
  mediaList.map((media) => {
    if (media.type == "video") {
      videoExists = true;
      videoContent += `
        <video controls>
          <source src="${media.video_info.variants[0].url}" type="video/mp4"/>
        </video>
      `;
    } else if (media.type == "animated_gif") {
      videoExists = true;
      videoContent += `
        <video controls>
          <source src="${media.video_info.variants[0].url}" type="video/mp4"/>
          </video>
      `;
    }
  });
  videoContent += `</div>`;
  return videoExists ? videoContent : "";
};
