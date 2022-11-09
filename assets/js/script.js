var info1 = $(".btn");
var lastFive = []
info1.on("click", function(){
    if(lastFive.length < 5)
    lastFive.push($("#lastSearch").val())
    localStorage.setItem("previosSearches", lastFive);
  })

var requestUrl = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
var searchButton = $("#search-btn");
var historyButton = $("#history-btn");
var ingredient = $("#search-input");

// $.ajax({
//   url: requestUrl,
//   method: "GET",
// }).then(function (response) {
//   console.log("Ajax response \n-------------");
//   console.table(response);
// });

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

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
    }
  });
}

searchButton.on("click", searchDrink);
// historyButton.on("click", searchDrink);
// function () {
//   var ingredientnow = ingredient.val() || $(this).val();
//   //   ingredientnow is either going to be the input of the search text area (when clicked by button near search text input)
//   // or is going to be the value of the button that is clicked

//   //   var ingredientnow = function () {
//   //     if ($(this).siblings("input")) {
//   //       return $(this).siblings("input").val();
//   //     } else {
//   //       return $(this).val();
//   //     }
//   //   };
//   console.log(ingredientnow);
//   var searchDrinkUrl = drinkUrl + ingredientnow;
//   console.log(searchDrinkUrl);

//   $.ajax({
//     url: searchDrinkUrl,
//     method: "GET",
//     crossDomain: true,
//   }).then(function (response) {
//     console.log(response);
//   });
// });

// function searchQuery() {
//   var ingredient = $("#search-input").val();
//   console.log(ingredient);
//   return ingredient;
// }

// ingredient = searchQuery();

// console.log(ingredient);

// function searchDrinkApi() {
//   var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
//   drinkUrl = drinkUrl + ingredient;
//   console.log(drinkUrl);

//   $.ajax({
//     url: drinkUrl,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//   });
// }

// searchDrinkApi();
