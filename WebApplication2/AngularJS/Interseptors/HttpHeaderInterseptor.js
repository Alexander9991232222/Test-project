CarRegisterApp.factory('httpHeaderInterceptor', () => {
    return {
        request: (config) => {
            // add http header
            config.headers["Content-Type"] = 'application/json;charset=utf-8'
            return config;
        }
    }
});

CarRegisterApp.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push('httpHeaderInterceptor');
}]);