app.controller('listsViewCtrl',[
    '$scope',
    'ChecklistsFct',
    function ($scope, ChecklistsFct) {

        $scope.allChecklists = {};
        $scope.date = new Date();

        ChecklistsFct.getChecklistJson().then(function (response) {
            $scope.allChecklists = response.data;
        });
    }]);
