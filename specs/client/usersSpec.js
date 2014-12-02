describe('Users Factory', function() {
  var users;

  beforeEach(module('CB'));
  beforeEach(inject(function($injector){
    users = $injector.get('users');
  }));

  it ('should return the guest user', function(){
    expect(users.get(0).name).to.equal('Guest');
    expect(users.get(0).courses).to.eql(['1']);
    expect(users.get(0).id).to.equal(0);
  });
});
