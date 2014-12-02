describe('Users Factory', function() {
  var users,$httpBackend;

  beforeEach(module('CB'));
  beforeEach(inject(function($injector){
    users = $injector.get('users');
    $httpBackend = $injector.get('$httpBackend');
  }));

  it ('should return the guest user', function(){
    var mockUser = {'name':{}};
    $httpBackend.expectGET("/users/1/courses").respond(mockUser);
    users.get(1).then(function(user){
      expect(user).to.eql(mockUser);
    });
    $httpBackend.flush();
  });
});
