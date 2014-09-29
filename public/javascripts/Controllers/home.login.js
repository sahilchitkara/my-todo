'use strict';

/**
 * @ngdoc function
 * @name todo.controller:HomeLoginCtrl
 * @description
 * # AboutCtrl
 * Controller of the todo
 */
angular.module('todo')
    .controller('HomeLoginCtrl', function ($scope, $http, $location, $state) {
        $scope.showErrorMessage = false;
        $http.get('/users/currentUser')
            .success(function (data) {
                if(! data.status ==404){
                    $state.go('dashboard');
                };
            });

        $scope.loginUser = function () {
            if ($scope.email && $scope.password) {
                $http.post('/users/login', {username: $scope.email, password: $scope.password})
                    .success(function (response) {
                        if (response.status==200) {
                            $state.go('dashboard');
                        }
                        else {
                            $scope.showErrorMessage = true;
                        }
                    });
            }
        };
    });
