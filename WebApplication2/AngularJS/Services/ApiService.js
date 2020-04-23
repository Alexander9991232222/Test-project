CarRegisterApp.factory("ApiService", ["$http", ($http) => {

    const apiUrls = {
        apiCar: "api/cars",
        apiPerson: "api/persons"
    }

    return ApiService = {
        //Request to CarsController
        getCars: () => $http.get(apiUrls.apiCar),
        getCarModels: () => $http.get(apiUrls.apiCar + "/getmodels"),
        addCar: (car) => $http.post(apiUrls.apiCar, car),
        updateCar: (car) => $http.put(apiUrls.apiCar, car),
        deleteCar: (car) => $http.delete(apiUrls.apiCar,{data:car,headers:{'Content-Type':'application/json;charset=utf-8'}}),
        //Request to PersonsController
        getPersons: () => $http.get(apiUrls.apiPerson),
        addPerson: (person) => $http.post(apiUrls.apiPerson, person),
        updatePerson: (person) => $http.put(apiUrls.apiPerson, person),
        deletePerson: (person) => $http.delete(apiUrls.apiPerson,{data:person})
    };
}])