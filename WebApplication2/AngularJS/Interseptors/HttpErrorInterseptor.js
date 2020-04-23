CarRegisterApp.factory('httpErrorInterceptor', ['$window', ($window) => {
    return {
        response: (res) => {
            return {
                errorStatus: false,
                errorMessage: "",
                result: res
            };
        },

        responseError: () => {
            return {
                errorStatus: true,
                data: null,
                errorMessage: "Request is not succes"
            }    
        }
    }
}]);

CarRegisterApp.config(['$httpProvider',($httpProvider) => {
    $httpProvider.interceptors.push('httpErrorInterceptor');
}]);