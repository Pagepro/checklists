app.controller('listsViewCtrl',[
    '$scope',
    'ChecklistsFct',
    function ($scope, ChecklistsFct) {

        $scope.allChecklists = {};

        ChecklistsFct.getChecklistJson().then(function (response) {
            $scope.allChecklists = response.data;
        });
    }]);
