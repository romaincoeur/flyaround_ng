'use strict';

(function(){
    /**
     * @ngdoc overview
     * @name flyaroundNgApp
     * @description
     * # flyaroundNgApp
     *
     * Main module of the application.
     */
    var app = angular.module('flyaroundApp', [
        'ngAnimate',
        'ngCookies',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'duParallax',
        'ui.bootstrap',
        'ngStorage',
        'uiGmapgoogle-maps'
    ]);

    app.config(function ($routeProvider, uiGmapGoogleMapApiProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/onepage.html',
                controller: 'HomeController'
            })
            .when('/app', {
                templateUrl: 'views/map.html',
                controller: 'MapController'
            })
            .otherwise({
                redirectTo: '/'
            });
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    });
})();