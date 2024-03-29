﻿CarRegisterApp.factory('httpPathInterceptor', ['$location', function ($location) {
    var path = {
        request: function (config) {
            var path = $location.absUrl();
            var pathArray = path.split('/');
            var appContext = pathArray[3];

            config.url = "/" + appContext + config.url;
            return config;
        },
        response: function (response) {
            return response;
        }
    };
    return path;
}]);

CarRegisterApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpPathInterceptor');
}]);