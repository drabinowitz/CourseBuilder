angular.module('CB.users',[])

.factory('users', [function(){
  var Users = {
    '1':{
      name:'Guest',
      courses: ['1']
    }
  };
  return {
    get:function(id){
      if (id == null) return Users;
      return Users[id];
    }
  };
}]);
