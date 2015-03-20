DEBUG = true;
DEBUGGER = false;

HOUSE_NAMES = ['Lannister', 'Snow', 'Stark', 'Tyrell'];

// Off listeners
// Learn CSS Bro!!
(function(){
  window.addEventListener("DOMContentLoaded", function(){
    setup();
  });

  var setup = function(){
    var houseContainer = document.getElementById('clickableHouses'),
        graveyardContainer = document.getElementById('graveyardContainer');

    window.houses = new Houses(HOUSE_NAMES, houseContainer);
    window.houses.addHouseGraveyards(graveyardContainer);

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





