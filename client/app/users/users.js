angular.module('CB.users',[])

.factory('users', [function(){
  var Users = {
    '0':{
      id: 0,
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
