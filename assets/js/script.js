var lastFive = [];
var searchButton = $("#search-btn");
var historyButton = $("#history-btn");
var ingredient = $("#search-input");
// parent div for results buttons
var results = $("#results");
var resultsButtons = $("#results-buttons");
const drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

// Set a same-site cookie for first-party contexts
document.cookie = 'cookie1=value1; SameSite=Lax';
// Set a cross-site cookie for third-party contexts
document.cookie = 'cookie2=value2; SameSite=None; Secure';



function searchDrink() {
  var ingredientnow = ingredient.val();
  console.log(ingredientnow);
  var searchDrinkUrl = drinkUrl + ingredientnow;
  console.log(searchDrinkUrl);

  // queries the cocktail db API for the search ingredient
  $.ajax({
    url: searchDrinkUrl,
    method: "GET",
    crossDomain: true,
  }).then(function (response) {
    console.log(response.drinks);
    var drinks = response.drinks;

    // creates an image to the right and posts the first result's thumbnail
    $("#cockTailPicture").html("");
    var imageL = $("<img>");
    imageL.addClass("rounded-3 drink-img");
    imageL.attr("src", drinks[0].strDrinkThumb);
    $("#cockTailPicture").append(imageL);

    // generates h2 to show user what they searched
    var showingResults = $("#showing-results");
    showingResults.text("Showing results for " + ingredientnow);
    $("#cocktailPicture").append(showingResults);

    // dynamically creates buttons
    for (let i = 0; i < 5; i++) {
      console.log(drinks[i]);
      var newButton = $("<button>");
      newButton.addClass("btn btn-primary my-2 py-3 result-btn");
      newButton.attr("id", drinks[i].idDrink);
      newButton.attr("type", "button");
      newButton.text(drinks[i].strDrink);
      resultsButtons.append(newButton);
      results.append(resultsButtons);
    }

    $(".result-btn").on("click", function () {
      // console.log($(this).html());
      var drinkId = $(this).attr("id");
      var drinkName = $(this).html() + " cocktail";

      for (let index = 0; index < drinks.length; index++) {
        if (drinkId === drinks[index].idDrink) {
          imageL.attr("src", drinks[index].strDrinkThumb);
        }
      }
      execute(drinkName);
      // onYouTubeIframeAPIReady();
    });
  });
}

// youtube API function loads the gapi client
function loadClient() {
  gapi.client.setApiKey("AIzaSyDWu797RIRANcSRSboAzwJaYGM1_jZV-0M");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

loadClient();

// youtube API function searches for the query object, then console logs the result
function execute(drinkName) {
  return gapi.client.youtube.search
    .list({
      q: drinkName,
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        console.log(response.result.items[0].id.videoId);
        var vidResult = response.result.items[0].id.videoId;
        var youtube = "https://www.youtube.com/embed/";
        var vidUrl = youtube + vidResult;
        $("#player").attr("src", vidUrl);
        $("#player").show();
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

// var player;
// function onYouTubeIframeAPIReady(result) {
//   player = new YT.Player("player", {
//     height: "390",
//     width: "640",
//     // insert variable video id from results
//     videoId: "nGdv-3wXfmc",
//     playerVars: {
//       playsinline: 1,
//     },
//     events: {
//       // onReady: onPlayerReady,
//     },
//   });
// }

// function onPlayerReady(event) {
//   event.target.playVideo();
// }
// function cocktailInfo() {
//   var cocktailSearch = drinkUrl + drinkId

//   $.ajax({
//     url: cocktailSearch,
//     method: "GET",
//     crossDomain: true,
//   }).then(function (response) {
//     console.log(response.drinks);
// });
// }

// these things happen when the search button is clicked
searchButton.on("click", function () {
  resultsButtons.html("");
  console.log(lastFive.length);
  //   adds ingredient to lastFive array, saves to localstorage
  if (lastFive.length < 5) {
    lastFive.push($("#search-input").val());
    localStorage.setItem("previousSearches", lastFive);
    console.log(lastFive);
  }
  //   runs function to search the API
  searchDrink();
  ingredient.val("");
  $("#player").hide();
});
