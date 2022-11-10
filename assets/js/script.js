var lastFive = [];
var searchButton = $("#search-btn");
var historyButton = $("#history-btn");
var ingredient = $("#search-input");
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
    // var resultButton = $("<button>");
    $("#cockTailPicture").html("");
    var imageL = $("<img>");
    imageL.attr("src", drinks[0].strDrinkThumb);
    $("#cockTailPicture").append(imageL);

    for (let i = 0; i < 5; i++) {
      console.log(drinks[i]);
      $("#result-btn-" + (1 + i)).text(drinks[i].strDrink);
    }
    document
      .getElementById("result-btn-1")
      .addEventListener("click", function () {
        imageL.attr("src", drinks[0].strDrinkThumb);
        $("#cockTailPicture").append(imageL);
      });

    document
      .getElementById("result-btn-2")
      .addEventListener("click", function () {
        imageL.attr("src", drinks[1].strDrinkThumb);
        $("#cockTailPicture").append(imageL);
      });
    document
      .getElementById("result-btn-3")
      .addEventListener("click", function () {
        imageL.attr("src", drinks[2].strDrinkThumb);
        $("#cockTailPicture").append(imageL);
      });
    document
      .getElementById("result-btn-4")
      .addEventListener("click", function () {
        imageL.attr("src", drinks[3].strDrinkThumb);
        $("#cockTailPicture").append(imageL);
      });
    document
      .getElementById("result-btn-5")
      .addEventListener("click", function () {
        imageL.attr("src", drinks[4].strDrinkThumb);
        $("#cockTailPicture").append(imageL);
      });
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
