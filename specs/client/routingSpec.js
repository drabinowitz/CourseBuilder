describe('Routing', function() {
  var $state;
  beforeEach(module('CB'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('should have a welcome state, template, and controller', function(){
    expect($state.get('welcome')).to.be.ok();
    expect($state.get('welcome').controller).to.be('welcomeController');
    expect($state.get('welcome').templateUrl).to.be('app/welcome/welcome.html');
  });

  it('should have a user state, template, and controller nested under users', function(){
    expect($state.get('users.user')).to.be.ok();
    expect($state.get('users.user').controller).to.be('userController');
    expect($state.get('users.user').templateUrl).to.be('app/users/user/user.html');
  });

  it('should have a courses state, template, and controller nested under user', function(){
    expect($state.get('users.user.courses')).to.be.ok();
    expect($state.get('users.user.courses').controller).to.be('coursesController');
    expect($state.get('users.user.courses').templateUrl).to.be('app/users/user/courses/courses.html');
  });

  it('should have a course state, template, and controller nested under courses', function(){
    expect($state.get('courses.course')).to.be.ok();
    expect($state.get('courses.course').controller).to.be('courseController');
    expect($state.get('courses.course').templateUrl).to.be('app/courses/course/course.html');
  });

  it('should have a lesson state, template, and controller nested under course', function(){
    expect($state.get('courses.course.lessons.lesson')).to.be.ok();
    expect($state.get('courses.course.lessons.lesson').controller).to.be('lessonController');
    expect($state.get('courses.course.lessons.lesson').templateUrl).to.be('app/courses/course/lessons/lesson/lesson.html');
  });
});
