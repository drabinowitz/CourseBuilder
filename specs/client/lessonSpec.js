describe('lesson',function(){
  describe('lesson factory',function(){
    var lesson,$httpBackend;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      lesson = $injector.get('lesson');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should get the templates for a lesson',function(){
      var mockLesson = {'assignments':[{},{},{}]};
      $httpBackend.expectGET('/courses/1/lessons/1/assignments').respond(mockLesson);
      lesson.get(1,1).then(function(lesson){
        expect(lesson).to.eql(mockLesson);
      });
      $httpBackend.flush();
    });
  });

  describe('lessonController',function(){
    var $scope,$rootScope,$controller,$stateParams,createController,lesson,mockLesson;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');
      $stateParams = $injector.get('$stateParams');
      $stateParams.lessonId = 0;

      mockLesson = {
        name:'testLesson',
        hours:5,
        id:0,
        templates:[{
          type:'text',
          body:'testTemplate',
          id:0
        }]
      };

      lesson = {
        get:function(lessonId){
          var lesson = [mockLesson];
          return {
            then:function(cb){
              cb(lesson[lessonId]);
            }
          };
        }
      };

      createController = function(){
        return $controller('lessonController',{
          $scope: $scope,
          $stateParams: $stateParams,
          lesson: lesson
        });
      };

    }));

    it('should get associated lesson',function(){
      createController();
      expect($scope.lesson).to.equal(mockLesson);
    });
  });
});
