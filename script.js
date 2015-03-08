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

    king.listen("click", btn, alertHi, btn, ["randomTest"]);
  }
}());

function alertHi(){
  if (DEBUGGER)
    debugger;

  console.log('hi' + this + " arguments are: " + arguments);
}

function ListenKing() { // Next Princes, DOM, stopListening
  this.listeners = [];
  this.ListenPrinces = {};

  var King = this;


  function ListenPrince(forWhat){
    this.forWhat = forWhat;
    this.listenSubjects = [];

    document.addEventListener(this.forWhat, function(evt){
      King.distribute(evt);
    });

    this.ListenSubject = ListenSubject;
  }

  ListenPrince.prototype.addListenSubject = function(onWhat, cb, byWho, extra){
    this.listenSubjects.push(new this.ListenSubject(onWhat, cb, byWho, extra));
  }

  ListenPrince.prototype.order = function(evt) {
    for (var i = 0; i < this.listenSubjects.length; i++){
      var subject = this.listenSubjects[i];

      if (subject.onWhat === evt.target) {
        var args = subject.extra.slice(0);

        args.push(evt);
        subject.cb.apply(subject.byWho, args);
      }
    }
  }

  function ListenSubject(onWhat, cb, byWho, extra){
    extra = extra || [];
    if (!(extra.constructor === Array))
      extra = [extra];


    this.onWhat = onWhat;
    this.cb = cb;
    this.byWho = byWho || document;
    this.extra = extra;
  }

  this.ListenPrince = ListenPrince;
}

ListenKing.prototype.comePrince = function(forWhat) {
  return this.ListenPrinces[forWhat];
}

ListenKing.prototype.createListenPrince = function(forWhat){
  return this.ListenPrinces[forWhat] = new this.ListenPrince(forWhat);
}

ListenKing.prototype.listen = function(forWhat, onWhat, cb, byWho, extra){
  var relevantPrince = this.comePrince(forWhat) ||
      this.createListenPrince(forWhat);

  relevantPrince.addListenSubject(onWhat, cb, byWho, extra);
}

ListenKing.prototype.distribute = function(evt){
  if (DEBUG)
    console.log('distributing ' + evt);

  var domain = evt.type,
      prince = this.comePrince(domain);

  if (prince)
    prince.order(evt);
}

