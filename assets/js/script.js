var info1 = $(".btn");
var lastFive = []
info1.on("click", function(){
    if(lastFive.length < 5)
    lastFive.push($("#lastSearch").val())
    localStorage.setItem("previosSearches", lastFive);
  })

