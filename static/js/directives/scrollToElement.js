app.directive('scrollToElem', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem , attrs,control) {
            var scrollSpeed = 500;
            if (attrs.scrollSpeed) {
                scrollSpeed = +attrs.scrollSpeed;
            }
            elem.bind('click', function () {
                angular.element('html, body').animate({
                    scrollTop: angular.element(attrs.scrollToElem).offset().top
                }, scrollSpeed);
            })
        }
    };
}]);
