var pageKing = (function(){
  var King = new ListenKing();

  function ListenKing() { // Next Princes, DOM, stopListening
    this.listeners = [];
    this.ListenPrinces = {};
  }

  ListenKing.prototype.comePrince = function(forWhat) {
    return this.ListenPrinces[forWhat];
  }

  ListenKing.prototype.createListenPrince = function(forWhat){
    return this.ListenPrinces[forWhat] = new ListenPrince(forWhat);
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

  function ListenPrince(forWhat){
    this.forWhat = forWhat;
    this.listenSubjects = [];

    document.addEventListener(this.forWhat, function(evt){
      King.distribute(evt);
    });
  }

  ListenPrince.prototype.addListenSubject = function(onWhat, cb, byWho, extra){
    this.listenSubjects.push(new ListenSubject(onWhat, cb, byWho, extra));
  }

  ListenPrince.prototype.order = function(evt) {
    for (var i = 0; i < this.listenSubjects.length; i++){
      var subject = this.listenSubjects[i];

      if (subject.carriesOut(evt)) {
        subject.carryOutOrder(evt);
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

  ListenSubject.prototype.carryOutOrder = function(evt){
    var args = this.extra.slice(0);

    args.push(evt);
    this.cb.apply(this.byWho, args);
  }

  ListenSubject.prototype.carriesOut = function(evt){
    return !!(this.onWhat === evt.target);
  }

  return King;
}());
