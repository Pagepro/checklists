app.directive('scrollToElem', [function () {
    return {
        restrict: 'A',
        scope: {
            scrollToElem: '='
        },
        link: function (scope, elem , attrs,control) {
            console.log(scope.toElem);
        }
    };
}]);
