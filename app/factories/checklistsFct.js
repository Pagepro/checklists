app.factory('ChecklistsFct', [
    '$http',
    function ($http) {
        var jsonBase = "src/json/"

        return {
            getChecklistJson: function () {
                return $http.get(jsonBase + 'checklist.json')
            }
        }
    }])
