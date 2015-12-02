describe('Pagepro Checklist module', function() {
  var scope,
    $rootScope,
    $httpBackend,
    controller,
    checklists,
    state;

  beforeEach(function () {
    module('pageproChecklistApp');
  });

  beforeEach(angular.mock.module(function ($provide) {

      // mock the entire $state provider
      $provide.provider('$state', function () {
          return {
              $get: function () {
                  return {
                      // by default it will be an empty object
                      params: {}
                  };
              }
          };
      });

  }));

  describe('detailsViewCtrl should', function () {
      beforeEach(inject(function ($injector, $state) {
          checklists = {"checklists": [
                {
                    "id": 1,
                    "name": "test",
                    "beforeStart": "asd",
                    "lists": [
                        {
                            "name": "Package with design and design related files",
                            "questions": [
                                {
                                    "id": "list-1_1",
                                    "label": "lorem ipsum"
                                },
                                {
                                    "id": "list-1_2",
                                    "label": "lorem ipsum"
                                },
                                {
                                    "id": "list-1_3",
                                    "label": "lorem ipsum"
                                },
                                {
                                    "id": "list-1_4",
                                    "label": "lorem ipsum"
                                },
                                {
                                    "id": "list-1_5",
                                    "label": "lorem ipsum"
                                },
                                {
                                    "id": "list-1_6",
                                    "label": "lorem ipsum"
                                }
                            ]
                        }
                      ]
                    }
                  ]
              };
          // state = $state;
          state = jasmine.createSpyObj('$state', ['go']);
          $httpBackend = $injector.get('$httpBackend');
          $httpBackend.whenGET(/templates\/.*/).respond('');

          $rootScope = $injector.get('$rootScope');

          var $controller = $injector.get('$controller');

          createController = function() {
            return $controller('detailsViewCtrl', {'$scope' : $rootScope, '$state':state });
          };

          $httpBackend.whenGET('src/json/checklist.json').respond(checklists);
          // $httpBackend.expectGET('src/json/checklist.json').respond(checklists);
      }));

      afterEach(function() {
          $httpBackend.verifyNoOutstandingExpectation();
          $httpBackend.verifyNoOutstandingRequest();
      });
      it('reset checked checkboxes list', function() {
          var controller = createController();
          $httpBackend.flush();
          $rootScope.checkboxList = {id: 1}
          expect($rootScope.checkboxList).toEqual({id: 1});
          $rootScope.resetCheckboxes();
          expect($rootScope.checkboxList).toEqual({});
      });
      it('get all checklists', function () {
          var controller = createController();
          expect($rootScope.allChecklists).toEqual({});
          $httpBackend.flush();
          expect($rootScope.allChecklists).toEqual(checklists);
      });
      it('redirect user to 404 page when id doesn\'t exist', function () {
        var controller = createController();
        state.params = { id: 0 };
        $httpBackend.flush();
        expect($rootScope.currentChecklist).toEqual({});
        expect(state.go).toHaveBeenCalledWith('errorState');
      });
      it('get checklist with id = 1', function() {
          var controller = createController();
          state.params = { id: 1 };
          $httpBackend.flush();
          expect($rootScope.currentChecklist.id).toEqual(1);
          expect($rootScope.currentChecklist.name).toEqual("test");
          expect($rootScope.currentChecklist.lists[0].questions.length).toEqual(6);
          expect(state.go).not.toHaveBeenCalledWith('errorState');
      });
  });
});
