app.controller('listsViewCtrl',[
    '$scope',
    'ChecklistsFct',
    function ($scope, ChecklistsFct) {

        $scope.allChecklists = undefined;

        ChecklistsFct.getChecklistJson().then(function (data) {
            $scope.allChecklists = data.data.checklists;
        });
    }]);
