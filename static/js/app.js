var app = angular.module('pageproChecklistApp', ['ui.router', 'ngSanitize']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('errorState', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
            .state('listsState', {
                url: '/',
                controller: 'listsViewCtrl',
                templateUrl: 'templates/listsView.html'
            })
            .state('detailsState', {
                url: '/details/:id',
                controller: 'detailsViewCtrl',
                templateUrl: 'templates/detailsView.html'
            })
    }])
    .run(function ($state) {
        console.info('Angular app started!');
        if (!$state.current.name) {
            $state.go('listsState');
        }
    });
