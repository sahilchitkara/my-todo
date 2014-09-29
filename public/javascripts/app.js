'use strict';

/**
 * @ngdoc overview
 * @name todo
 * @description
 * # todo
 *
 * Main module of the application.
 */
angular
    .module('todo', [
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "/partials/native-login.html",
                controller: 'HomeLoginCtrl'
            })
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "/partials/dashboard.html",
                controller : 'DashboardCtrl'
            })
            .state('taskCreate', {
                url: "/task/create",
                templateUrl: "/partials/task.new.html",
                controller : 'newTaskCtrl'
            })
            .state('taskView', {
                url: "/task/:id",
                templateUrl: "/partials/task.view.html",
                controller : 'editCtrl'
            })

        $urlRouterProvider.otherwise('/login');
    });