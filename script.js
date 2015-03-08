DEBUG = true;
DEBUGGER = false;


(function(){
  window.addEventListener("DOMContentLoaded", function(){
    setup();
  });

  var setup = function(){
    setupListeners();
  }

  var setupListeners = function() {
    var king = new ListenKing(),
        btn = document.getElementsByClassName('myButtonOne')[0];

    king.listen("click", btn, alertHi, document, "randomTest");
  }
}());

function alertHi(){
  debugger;
  alert('hi' + this);
}

function ListenKing() { // Next Princes
  this.listeners = [];
  this.listeningTo = {};
}

ListenKing.prototype.listen = function(forWhat, onWhat, cb, byWho, extra){
  var self = this,
      context = byWho || document,
      who_cb_extra = [forWhat, onWhat, cb, byWho];

  if (!this.listeningTo[forWhat])
    document.addEventListener(forWhat, function(evt){
      self.distribute(evt);
    })

  if (extra) {
    if (!(extra.constructor === Array))
      extra = [extra];

    who_cb_extra.push(extra);
  }

  this.listeners.push(who_cb_extra);
}

ListenKing.prototype.distribute = function(evt){
  if (DEBUG)
    console.log('distributing ' + evt);

  for (var i = 0; i < this.listeners.length; i++){
    var oneListen = this.listeners[i],
        forWhat = oneListen[0],
        onWhat = oneListen[1];

    if (forWhat === evt.type && onWhat === evt.target){

      if (DEBUGGER)
        debugger;

      var cb = oneListen[2],
          byWho = oneListen[3],
          extra = (oneListen[4] && oneListen[4].slice(0)) || [];

      extra.push(evt);

      cb.apply(byWho, extra);
    }
  }
}

