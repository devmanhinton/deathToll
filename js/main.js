DEBUG = true;
DEBUGGER = false;

HOUSE_NAMES = ['Lannister', 'Snow', 'Stark', 'Tyrell'];
HOUSE_BANNER_CLASSES = "houseBanner myButtonOne";

// Off listeners
// Learn CSS Bro!!

(function(){
  window.addEventListener("DOMContentLoaded", function(){
    setup();
  });

  var setup = function(){
    var houseContainer = document.getElementById("clickableHouses");
    window.houses = new Houses(HOUSE_NAMES, houseContainer);
    setupListeners();
  }

  var setupListeners = function() {
    var btn = document.getElementsByClassName('myButtonOne')[0];
    pageKing.listen("click", btn, alertHi, btn, ["randomTest"]);
  }
}());


function alertHi(){
  if (DEBUGGER)
    debugger;
  console.log('hi' + this + " arguments are: " + arguments);
}
// Add Code such that automated adding of houses and death tolls





