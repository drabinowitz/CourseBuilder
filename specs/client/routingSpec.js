describe('Routing', function() {
  var $state;
  beforeEach(module('CB'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('should have a welcome state, template, and controller', function(){
    expect($state.get('welcome')).to.be.ok();
    expect($state.get('welcome').controller).to.be('WelcomeController');
    expect($state.get('welcome').templateUrl).to.be('app/welcome/welcome.html');
  });
});
