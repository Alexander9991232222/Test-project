CarRegisterApp.controller('MainController', async ($scope, MainService, ApiService) => {
    loadData();

    let EModal = {
        person: "person",
        car: "car",
        defaultDelete: "delete"
    }

    let EModalTitle = {
        personAdd: "Person add",
        personEdit: "Person edit",
        personDelete: "Person delete",
        carAdd: "Car add",
        carEdit: "Car edit",
        carDelete: "Car delete",
    }
  
    $scope.titleModal = "";
    $scope.modalSwitcher = "";
    $scope.actionSelect = {};
    $scope.selectPerson = {};
    $scope.selectCar = {};

    async function loadData() {
        console.log("loading...")
        if (await MainService.loadData()) {
            $scope.persons = await MainService.getPersons();

            $scope.carModelsConverted = MainService.getCarModelsConverted();
            $scope.carModels = MainService.getCarModels();
            $scope.carKeysModel = Object.keys($scope.carModelsConverted);  
            $scope.carKeyModel = $scope.carKeysModel[0];

            $scope.$apply();
            console.log("end loading")
        } else {
            console.log(MainService.errorMessage);
        }
    };

    $scope.EditCarModal = (person) => {
        $scope.modalSwitcher = EModal.car;
        $scope.titleModal = EModalTitle.carEdit;
        $scope.selectCar = Object.assign({}, person.cars.find(x => x.id === person.selectedCarId))
        $scope.selectCar.personId = person.id;
        $scope.selectCar.id = person.selectedCarId;
    }

    $scope.EditPersonModal = (person) => {
        $scope.modalSwitcher = EModal.person;
        $scope.titleModal = EModalTitle.personEdit;
        $scope.selectPerson = Object.assign({}, person);
    }

    $scope.AddPersonModal = () => {
        $scope.modalSwitcher = EModal.person;
        $scope.titleModal = EModalTitle.personAdd;
        $scope.selectPerson = {};
    }

    $scope.AddCarModal = (person) => {
        $scope.modalSwitcher = EModal.car;
        $scope.titleModal = EModalTitle.carAdd;
        $scope.selectCar = {
            carName: $scope.carKeysModel[0]
        };
        $scope.selectCar.personId = person.id;
    }

    $scope.DeletePersonModal = (person) => {
        $scope.modalSwitcher = EModal.defaultDelete;
        $scope.titleModal = EModalTitle.personDelete;
        $scope.selectPerson = Object.assign({}, person);
    }

    $scope.DeleteCarModal = (carId) => {
        $scope.modalSwitcher = EModal.defaultDelete;
        $scope.titleModal = EModalTitle.carDelete;
        $scope.selectCar.id = carId;
    }

    $scope.sendRequest = async () => {
        let res = null;

        switch ($scope.titleModal) {
            case EModalTitle.carAdd:
                $scope.selectCar.carModelId = getCarIdByNameAndModel();
                res = await ApiService.addCar($scope.selectCar);
                break;
            case EModalTitle.personAdd:
                res = await ApiService.addPerson($scope.selectPerson);
                break;
            case EModalTitle.carEdit:
                $scope.selectCar.carModelId = getCarIdByNameAndModel();
                res = await ApiService.updateCar($scope.selectCar);
                break;
            case EModalTitle.personEdit:
                res = await ApiService.updatePerson($scope.selectPerson);
                break;
            case EModalTitle.carDelete:
                res = await ApiService.deleteCar($scope.selectCar);
                break;
            case EModalTitle.personDelete:
                res = await ApiService.deletePerson($scope.selectPerson);
                break;
        } 

        if (res.errorStatus) {
            window.alert(res.errorMessage);
        }

        $("#modalWindow").modal('toggle');    
        loadData(); 
    }

    function getCarIdByNameAndModel(){
        return $scope.carModels.find(x => x.carName === $scope.selectCar.carName
            && x.carModel === $scope.selectCar.carModel).id;
    }
});

