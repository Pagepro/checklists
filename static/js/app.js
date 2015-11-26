var app = angular.module('pageproChecklistApp', ['ui.router', 'ngSanitize']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('errorState', {
                url: '/404',
                template: '<h1>404</h1><a href="#/details/1">details 1</a>'
            })
            .state('detailsState', {
                url: '/details/:id',
                controller: 'detailsViewCtrl',
                templateUrl: 'templates/detailsView.html'
            })
    }])
    .run(function () {
        console.log('it works!');
    });
