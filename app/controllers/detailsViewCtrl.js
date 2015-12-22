app.controller('detailsViewCtrl',[
    '$scope',
    '$rootScope',
    '$window',
    'ChecklistsFct',
    '$state',
    function ($scope, $rootScope, $window, ChecklistsFct, $state) {
        $scope.allChecklists = {};
        $scope.currentChecklist = {};
        $scope.checkboxList = {};
        $scope.localStorageNamespace = 'pagepro_checklists_';
        $scope.date = new Date();

        $scope.changeTriggered = function DVC_changeTriggered () {
            $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify($scope.checkboxList);
        }

        $scope.resetCheckboxes = function DVC_resetCheckboxes () {
            $scope.checkboxList = {};
            $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify({});
        }

        $scope.setCurrentChecklist = function DVC_setCurrentChecklist () {
            if (!$state.params) {
                $state.go('errorState');
                return;
            }
            $scope.allChecklists.forEach(function (elem) {
                if (+elem.id === +$state.params.id) {
                    $scope.currentChecklist = elem;
                    return;
                }
            });
            // if id is not found, redirect to 404
            if (!Object.keys($scope.currentChecklist).length) {
                $state.go('errorState');
                return;
            }
            // set new localstorage namespace for current list if do not exists
            if(!$window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id]) {
                $window.localStorage[$scope.localStorageNamespace + $scope.currentChecklist.id] = JSON.stringify({});
            }

            // get list of checked checkboxes from localstorage
            $scope.checkboxList = JSON.parse($window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id]);

            // setting up new page title
            $rootScope.title = $scope.currentChecklist.name;
        }

        $scope.getChecklistJson = function DVC_getChecklistJson () {
            ChecklistsFct.getChecklistJson().then(function (response) {
                $scope.allChecklists = response.data;
                $scope.setCurrentChecklist();
            });
        }

        $scope.getChecklistJson();

    }]);
