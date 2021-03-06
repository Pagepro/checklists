var app = angular.module('pageproChecklistApp', ['ui.router', 'ngSanitize']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // redirects to listsState when no #/ in url
        $urlRouterProvider.when('', '/');
        // redirects to '404 not found' page if url not match any state
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('errorState', {
                url: '/404',
                title: '404 - Page not found',
                templateUrl: 'templates/404.html'
            })
            .state('listsState', {
                url: '/',
                controller: 'listsViewCtrl',
                title: 'List of checklists',
                templateUrl: 'templates/listsView.html'
            })
            .state('detailsState', {
                url: '/details/:id',
                controller: 'detailsViewCtrl',
                templateUrl: 'templates/detailsView.html'
            })
    }])
    .run([
        '$rootScope',
        '$state',
        function ($rootScope, $state) {
        // setting new page title on state changing
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                $rootScope.title = toState.title;
                // sroll top on state change
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });
    }]);
