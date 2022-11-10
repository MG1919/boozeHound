var lastFive = [];
var searchButton = $("#search-btn");
var historyButton = $("#history-btn");
var ingredient = $("#search-input");
// parent div for results buttons
var results = $("#results");
var resultsButtons = $("#results-buttons");
const drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

function searchDrink() {
  var ingredientnow = ingredient.val();
  console.log(ingredientnow);
  var searchDrinkUrl = drinkUrl + ingredientnow;
  console.log(searchDrinkUrl);

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
    imageL.addClass("rounded-3");
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
      newButton.text(drinks[i].strDrink);
      resultsButtons.append(newButton);
      results.append(resultsButtons);
    }

    $(".result-btn").on("click", function () {
      console.log($(this).html());
      var drinkId = $(this).attr("id");
      console.log(drinkId);

      for (let index = 0; index < drinks.length; index++) {
        if (drinkId === drinks[index].idDrink) {
          imageL.attr("src", drinks[index].strDrinkThumb);
        }
      }
      // drinkImage = this.text.value;
      // console.log(drinkImage);
      // imageL.attr("src", $(this).drinks[position].strDrinkThumb);
      // $("#cockTailPicture").append(imageL);
    });
    // document
    //   .getElementById("result-btn-1")
    //   .addEventListener("click", function () {
    //     imageL.attr("src", drinks[0].strDrinkThumb);
    //     $("#cockTailPicture").append(imageL);
    //   });
  });
}

searchButton.on("click", function () {
  resultsButtons.html("");
  console.log("goodjob");
  console.log($("#search-input").val());
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
});
