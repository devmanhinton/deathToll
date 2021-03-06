HOUSE_BANNER_CLASSES = "houseBanner myButtonOne";
GRAVEYARD_CLASSES = "graveyard";
GRAVEYARD_ID = "houseName-graveyard";

function Houses (houseNames, elem, skipAdd) {
  this.houseNames = houseNames;
  this.elem = elem;

  if (!skipAdd)
    this.addHouseBanners();
}

Houses.prototype.addHouseBanners = function(){
  for (var i = 0; i < this.houseNames.length; i++){
    this.addHouse(this.houseNames[i], i);
  }
}

Houses.prototype.addHouse = function(house, ith){
  var button = document.createElement("button"),
      className = HOUSE_BANNER_CLASSES;

  if (ith === 0)
    className += " first";

  button.className = className;
  button.textContent = "House " + house;

  this.elem.appendChild(button);
}

Houses.prototype.addHouseGraveyards = function(elem){
  if (!elem && !this.graveyardElem) {
    console.log('WARNING - addHouseGraveyards called but no elem known');
    return;
  }

  this.graveyards || (this.graveyards = []);

  for (var i = 0; i < this.houseNames.length; i++){
    var container = document.createElement('div'),
        houseName = this.houseNames[i];

    container.className = GRAVEYARD_CLASSES,
    container.id = GRAVEYARD_ID.replace('houseName', houseName);
    container.textContent = houseName + " graveyard";

    container.style.cssFloat = 'left';

    this.graveyards.push(container);
    elem.appendChild(container);

  }
}