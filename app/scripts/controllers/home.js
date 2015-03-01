'use strict';

/**
 * @ngdoc function
 * @name flyaroundApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the flyaroundApp
 */
var app = angular.module('flyaroundApp');

app.controller('HomeController', function ($scope, parallaxHelper) {
        $scope.background = parallaxHelper.createAnimator(-0.7);
    });

app.controller('ModalController', function($scope, $modal) {
    $scope.openRegisterModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/registerModal.html',
            controller: 'RegisterController'
        });

    };

    $scope.openConnectionModal = function () {

        var modalInstance = $modal.open({
            templateUrl: 'views/connectionModal.html',
            controller: 'ConnectionController'
        });
    };
});

app.controller('RegisterController', function($scope, $modalInstance) {
    $scope.closeModal = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        Main.save(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location = "/"
            }
        }, function() {
            $rootScope.error = 'Failed to signup';
        })
    };
});

app.controller('ConnectionController', function($scope, $modalInstance, $localStorage, $location) {
    $scope.closeModal = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.signin = function() {
        $localStorage.token = $scope.connection.username;
        console.log($localStorage.token);
        $modalInstance.close();
        $location.path( "/app" );
    };
});