'use strict';

/**
 * @ngdoc function
 * @name flyaroundApp.controller:MapController
 * @description
 * # MapController
 * Controller of the flyaroundApp
 */
var app = angular.module('flyaroundApp');

app.controller('MapController', function($log, $http, uiGmapGoogleMapApi, $scope) {
    $scope.flies = [];
    $scope.terrains = [];

    $scope.clusterOptions = {
        title: 'Cluster',
        gridSize: 60,
        ignoreHidden: true,
        minimumClusterSize: 2,
        enableRetinaIcons: true,
        styles: [{
            url: 'images/cluster_1.png',
            textColor: 'transparent',
            textSize: 18,
            width: 50,
            height: 50
        }]
    };

    $scope.icons = [
        'images/marker_airport.png'
    ];

    //Markers should be added after map is loaded
    uiGmapGoogleMapApi.then(function(maps) {
        $scope.map = {
            center: { latitude: 47, longitude: 2.3426246 },
            zoom: 6,
            options: {
                mapTypeId: google.maps.MapTypeId.HYBRID
            }
        };

        if ($scope.flies.length == 0){
            $http.get('http://localhost/flyaround_s2/web/app_dev.php/api/flies.json', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function(data){
                    angular.forEach(data, function(value){
                        value.icon = {
                            url: 'images/marker_'+value.category +'.png',
                            scaledSize: new google.maps.Size(50, 50)
                        };
                        value.events = {
                            click: function (marker, eventName, args) {
                                $log.log('marker clicked');
                                $log.log(marker.getPosition().lat());
                                $log.log(marker.getPosition().lng());
                            }
                        }
                    });
                    $log.log(data);
                    $scope.flies = data;
                })
                .error(function(data){
                    $log.error('unable to get flies from flyaround API');
                });
        }
        if ($scope.terrains.length == 0){
            $http.get('http://localhost/flyaround_s2/web/app_dev.php/api/terrains.json', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .success(function(data){
                    angular.forEach(data, function(value){
                        value.icon = {
                            url: 'images/marker_airport.png',
                            scaledSize: new google.maps.Size(50, 50)
                        };
                    });
                    $log.log(data);
                    $scope.terrains = data;
                })
                .error(function(data){
                    $log.error('unable to get terrains from flyaround API');
                });
        }
    });
});

app.controller('PanelController', function($log, $scope) {
    var panel = this;
    this.panelMode = false;
    this.tab = "";

    this.select = function(tab) {
        if (this.tab === tab && this.panelMode === true){
            this.tab = "";
            this.panelMode = false;
        } else {
            this.tab = tab;
            this.panelMode = true;
        }
    };

    this.isSelected = function(tab) {
        return this.tab === tab;
    };

    $scope.onMarkerClicked = function (marker) {
        $log.log("Marker: lat: " + marker.getPosition().lat() + ", lon: " + marker.getPosition().lng()+ " clicked!!");
        panel.select('flyshow');
    };
});

app.directive('flylist', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/flylist.html'
    };
});

app.directive('flyShow', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/fly-show.html'
    };
});

app.directive('newFly', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/newfly.html'
    };
});
