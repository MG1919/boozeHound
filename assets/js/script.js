var lastFive = [];
var searchButton = $("#search-btn");
var historyButton = $("#history-btn");
var ingredient = $("#search-input");
const drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

function searchDrink() {
  var ingredientnow = ingredient.val();
  //
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
    // var resultButton = $("<button>");
    for (let i = 0; i < 5; i++) {
      console.log(drinks[i]);
      //   TODO: populate value of results buttons with Drink names
    }
  });
}

searchButton.on("click", function () {
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
});
