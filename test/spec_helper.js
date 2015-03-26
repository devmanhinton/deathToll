// The order of these files might matter...
before(function(){
  if (typeof expect === 'undefined')
    expect = chai.expect;

  if (typeof should === 'undefined')
    should = chai.should();
});