'use strict';

/**
 * @ngdoc function
 * @name todo.controller:DashboardCtrl
 * @description
 * # AboutCtrl
 * Controller of the todo
 */
angular.module('todo')
    .controller('DashboardCtrl', function ($scope, $http, $location, $state) {
        $scope.tasks = [];
        $scope.delete = function (id, index) {
            $http.delete('/tasks/delete/' + id)
                .success(function (data) {
                    console.log(data)
                    $scope.tasks.splice(index, 1);

                })
                .error(function (error) {
                    console.log("error deleting todo task");
                });
        };
        $scope.list = function () {
            $http.get('/tasks/get')
                .success(function (result) {
                    console.log(result)
                    $scope.tasks = result.data
                })
                .error(function (error) {
                });
        };
        $scope.get = function (id) {
            $http.get('/tasks/get/' + id)
                .success(function (data) {
                    console.log(data);
                })
                .error(function (error) {
                    console.log(error);
                });
        };
        $scope.update = function (id) {
            var obj = {
                title: $scope.todo.title,
                description: $scope.todo.description,
                dueTimeStamp: $scope.todo.dueDate,
                status: $scope.todo.status
            }
            $http.post('/tasks/update/' + id, obj)
                .success(function (data) {
                    console.log(data)
                })
                .error(function (error) {
                    console.log(error);
                });
        };
        $scope.list();
        $scope.editTask = function (taskId) {
            if (taskId) {
                $state.go('taskView', { 'id': encodeURIComponent(taskId)});
            }
        }
        $scope.logout = function () {
            $http.get('/logout')
                .success(function (response) {
                    if (response.success) {
                        $location.path('/');
                    }
                });
        };
        $scope.toggleStatus = function (id, index) {
            var obj = {status: $scope.tasks[index].status == 'incomplete' ? 'complete' : 'incomplete'}
            $http.post('/tasks/update/' + id, obj)
                .success(function (data) {
                    $scope.tasks[index].status =obj.status;
                })
                .error(function (error) {

                })
        }
    });
