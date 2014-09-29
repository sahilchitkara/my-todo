'use strict';

/**
 * @ngdoc function
 * @name todo.controller:DashboardCtrl
 * @description
 * # AboutCtrl
 * Controller of the todo
 */
angular.module('todo')
    .controller('editCtrl', function ($scope, $http, $location, $stateParams, $state) {
        $scope.status=[{value:'complete'},{value:'incomplete'}]
        $scope.delete = function () {
            $http.delete('/tasks/delete/' + $stateParams.id)
                .success(function (data) {
                   $state.go('dashboard');
                })
                .error(function (error) {
                    console.log("error deleting todo task");
                });
        };
        $scope.get = function (id) {
            $http.get('/tasks/get/' + id)
                .success(function (response) {
                    $scope.todo=response.data
                    $scope.todo.status=response.data.status=='complete' ? $scope.status[0] : $scope.status[1]
                })
                .error(function (error) {
                    console.log(error);
                });
        };
        $scope.save = function () {
            if($scope.todo.title==''){
                $scope.todo.valid=true;
            }else{
                var obj = {
                    title: $scope.todo.title,
                    description: $scope.todo.description,
                    dueDate: $scope.todo.dueDate,
                    status: $scope.todo.status.value
                }
                $http.post('/tasks/update/'+$stateParams.id, obj)
                    .success(function (data) {
                        $state.go('dashboard');
                    })
                    .error(function (error) {
                        console.log("Error Creating task")
                    });
            }
        };
        $scope.back = function () {
            $state.go('dashboard');
        };
        $scope.get($stateParams.id);
    });
