app.controller('detailsViewCtrl',[
    '$scope',
    '$window',
    'ChecklistsFct',
    '$state',
    '$stateParams',
    function ($scope, $window, ChecklistsFct, $state, $stateParams) {
        $scope.allChecklists = undefined;
        $scope.currentChecklist = undefined;


        $scope.changeTriggered = function DVC_changeTriggered () {
            $window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id] = JSON.stringify($scope.checkboxList);
        }

        $scope.resetCheckboxes = function DVC_resetCheckboxes () {
            $scope.checkboxList = {};
            $window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id] = JSON.stringify({});
        }

        $scope.setCurrentChecklist = function DVC_setCurrentChecklist () {
            $scope.allChecklists.checklists.forEach(function (elem) {
                if (elem.id === +$stateParams.id) {
                    $scope.currentChecklist = elem;
                    return;
                }
            });
            if (!$scope.currentChecklist) {
                $state.go('errorState');
            }
            if(!$window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id]) {
                $window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id] = JSON.stringify({});
            }

            $scope.checkboxList = JSON.parse($window.localStorage['pagepro_checklists_' + $scope.currentChecklist.id] || {});
        }

        $scope.triggerScroll = function DVC_triggerScroll () {
            angular.element('html, body').animate({
                scrollTop: angular.element('.sec--main').offset().top
            }, 600);
        }

        ChecklistsFct.getChecklistJson().then(function (data) {
            $scope.allChecklists = data.data;
            $scope.setCurrentChecklist();
        });
    }]);
