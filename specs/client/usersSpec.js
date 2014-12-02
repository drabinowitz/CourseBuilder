describe('Users Factory', function() {
  var users;

  beforeEach(module('CB'));
  beforeEach(inject(function($injector){
    users = $injector.get('users');
  }));

  it ('should return the guest user', function(){
    expect(users.get(1).name).to.equal('Guest');
    expect(users.get(1).courses).to.eql(['1']);
  });
});
