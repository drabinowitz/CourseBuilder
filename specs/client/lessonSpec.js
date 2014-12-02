describe('lesson',function(){
  describe('lesson factory',function(){
    var lesson;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      lesson = $injector.get('lesson');
    }));

    it('should get the templates for a lesson',function(){
      var lesson1 = lesson.get(0);
      expect(lesson1.name).to.equal('lesson1');
      expect(lesson1.hours).to.equal(3);
      expect(lesson1.id).to.equal(0);
      expect(lesson1.assignments).to.eql([
        {
          type:'text',
          body:'Here is the first lesson',
          id:0
        },
        {
          type:'text',
          body:'It can have many assignments',
          id:1
        }
      ]);
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
          return lesson[lessonId];
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
