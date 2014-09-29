'use strict';

/**
 * @ngdoc function
 * @name todo.controller:DashboardCtrl
 * @description
 * # AboutCtrl
 * Controller of the todo
 */
angular.module('todo')
    .controller('newTaskCtrl', function ($scope, $http, $location, $state) {
        $scope.todo={title:'Task 1'};
        $scope.save = function () {
            if($scope.todo.title==''){
                $scope.todo.valid=true;
            }else{
                var obj = {
                    title: $scope.todo.title,
                    description: $scope.todo.description,
                    dueDate: $scope.todo.dueDate,
                    status: "incomplete"
                }
                console.log(obj);
                $http.put('/tasks/create', obj)
                    .success(function (data) {
                        $state.go('dashboard');
                    })
                    .error(function (error) {
                        console.log("Error Creating task");
                    });
        }
        };
        $scope.back = function () {
            $state.go('dashboard');
        };
    });
