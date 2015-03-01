'use strict';

/**
 * Created by romain on 01/03/15.
 */

var app = angular.module('flyaroundApp');

app.factory('panelManager', function() {
    var panelServiceInstance;

    panelServiceInstance.panelMode = false;

    panelServiceInstance.tab = "";

    panelServiceInstance.select = function(tab) {
        if (this.tab === tab && this.panelMode === true){
            this.panelMode = false;
        } else {
            this.tab = tab;
            this.panelMode = true;
        }
    };

    panelServiceInstance.isSelected = function(tab) {
        return this.tab === tab;
    };

    return panelServiceInstance;
});