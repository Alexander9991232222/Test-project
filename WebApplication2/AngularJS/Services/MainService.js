class Person {
    constructor(person, carsPerson) {
        this.id = person.id;
        this.name = person.name;
        this.surname = person.surname
        this.patronymic = person.patronymic;
        this.phone = parseInt(person.phone);
        this.cars = carsPerson;
        this.selectedCarId = carsPerson[0]?.id;
    }
}

class CarPerson {
    constructor() {
        this.id = 0;
        this.carName = "";
        this.carModel = "";
        this.carNumber = "";
        this.carModelId = 0;
    }
}

CarRegisterApp.factory("MainService", ["ApiService", (ApiService) => {

    var $this = {
        errorMessage: "",
        persons: [],
        cars: [],
        carModels: []
    }

    $this.getPersons = () => buildPersons();
    $this.getCarModels = () => $this.carModels;

    //Load all datas from back
    $this.loadData = async () => {
        let results = await Promise.all([
            ApiService.getPersons(),
            ApiService.getCars(),
            ApiService.getCarModels()
        ]);

        if (isSuccesLoad(results)) {
            $this.persons = results[0].result.data;
            $this.cars = results[1].result.data
            $this.carModels = results[2].result.data
            return true;
        } else {
            $this.errorMessage = results.find(x => x.errorStatus === true).errorMessage;
        }
        return false;
    }

    //Build new array persons
    function buildPersons() {
        let tempPersons = [];

        $this.persons?.forEach((person) => {
            let carsPerson = setCars($this.cars?.filter(x => x.personId === person.id));
            tempPersons.push(new Person(person, carsPerson));
        });

        return tempPersons;
    };

    function isSuccesLoad(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].errorStatu) {
                return false;
            }
        }
        return true
    }

  
    //Build new array cars for person
    function setCars(cars){
        let c = [];

        cars?.forEach((car) => {
            let infoCarModel = $this.carModels.find(x => x.id === car.carModelId);

            if (infoCarModel) {

                let tempCar = new CarPerson();
                tempCar.id = car.id;
                tempCar.carModel = infoCarModel.carModel;
                tempCar.carNumber = car.carNumber;
                tempCar.carName = infoCarModel.carName;

                c.push(tempCar);
            }
        });
            
        return c;
    };

    $this.getCarModelsConverted = () => {
        let cm = {};

        $this.carModels.forEach(el => {
            if (cm[el.carName]) {
                cm[el.carName].push(el.carModel);
            } else {
                cm[el.carName] = [];
                cm[el.carName].push(el.carModel);
            }
        });

        return cm;
    }

    return $this;
}])

