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

  it('should have a user state, template, and controller nested under users', function(){
    expect($state.get('users.user')).to.be.ok();
    expect($state.get('users.user').controller).to.be('UserController');
    expect($state.get('users.user').templateUrl).to.be('app/users/user/user.html');
  });

  it('should have a courses state, template, and controller nested under user', function(){
    expect($state.get('users.user.courses')).to.be.ok();
    expect($state.get('users.user.courses').controller).to.be('CoursesController');
    expect($state.get('users.user.courses').templateUrl).to.be('app/users/user/courses/courses.html');
  });
});
