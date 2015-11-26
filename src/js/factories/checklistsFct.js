app.factory('ChecklistsFct', [
    '$http',
    function ($http) {
        var jsonBase = "src/json/"

        var getChecklistJson = function CF_getChecklistJson () {
            return $http.get(jsonBase + 'checklist.json').success(function (response) {
                return response;
            }).error(function (response) {
                return response;
            });
        };

        return {
            getChecklistJson: getChecklistJson
        }
    }])
