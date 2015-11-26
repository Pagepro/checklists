app.controller('detailsViewCtrl',[
    '$scope',
    '$rootScope',
    '$window',
    'ChecklistsFct',
    '$state',
    '$stateParams',
    function ($scope, $rootScope, $window, ChecklistsFct, $state, $stateParams) {
        $scope.allChecklists = {};
        $scope.currentChecklist = {};
        $scope.localStorageNamespace = 'pagepro_checklists_';


        $scope.changeTriggered = function DVC_changeTriggered () {
            $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify($scope.checkboxList);
        }

        $scope.resetCheckboxes = function DVC_resetCheckboxes () {
            $scope.checkboxList = {};
            $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify({});
        }

        $scope.setCurrentChecklist = function DVC_setCurrentChecklist () {
            $scope.allChecklists.checklists.forEach(function (elem) {
                if (elem.id === +$stateParams.id) {
                    $scope.currentChecklist = elem;
                    return;
                }
            });
            if (!Object.keys($scope.currentChecklist).length) {
                $state.go('errorState');
            }
            if(!$window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id]) {
                $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify({});
            }

            $scope.checkboxList = JSON.parse($window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id] || {});

            // setting up new page title
            $rootScope.title = $scope.currentChecklist.name;
        }

        ChecklistsFct.getChecklistJson().then(function (data) {
            $scope.allChecklists = data.data;
            $scope.setCurrentChecklist();
        });
    }]);
