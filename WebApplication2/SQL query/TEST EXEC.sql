--SELECT 
EXEC DBO.SelectPersons
--EXEC DBO.SelectCars

--ADD
--EXEC DBO.AddPerson @json = '{"name":"Dima","surname":"testM","patronymic":"testL", "phone":"0930815992"}'
--EXEC DBO.AddCar @json = '{"personId": "1", "carModelId":4, "carNumber":"256AS"}'

--UPDATE
--EXEC DBO.UpdatePerson @json = '{"id":1, "name":"Jony", "surname":"Thushkevich", "patronymic":"Olegovich","phone":"0999876154"}'
--EXEC DBO.UpdateCar @json = '{"id":4, "carNumber":"test", "carModelId": 2, "personId":5}'

--DELETE 
--EXEC DBO.DeletePerson @json = '{"id":1}'
--EXEC DBO.DeleteCar @json = '{"id":1}'