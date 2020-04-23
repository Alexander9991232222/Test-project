----------------------SELECT PROCEDURE
--SELECT ALL
CREATE PROCEDURE SelectPersons 
AS 
BEGIN
	SELECT * FROM GetAllPersonsInfo()
	FOR JSON PATH
END
GO;

--SELECT BY ID 
CREATE PROCEDURE SelectPersonById @id int
AS 
BEGIN
	SELECT * FROM GetAllPersonsInfo() AS ps
	WHERE @ID = ps.Id
	FOR JSON PATH
END
GO;

--SELECT CARMODELS
CREATE PROCEDURE SelectCarModels
AS
BEGIN
	SELECT cm.CAR_MODEL_ID 'id', cm.CAR_MODEL 'carModel', cn.CAR_NAME 'carName' FROM [dbo].[CarModels] AS cm
	LEFT JOIN [dbo].[CarNames] AS cn ON cm.CAR_NAME_ID = cn.CAR_NAME_ID
	FOR JSON PATH
END
GO;

--SELECT CARS
	SELECT * 
CREATE PROCEDURE SelectCars
AS
BEGIN
	SELECT c.PERSON_ID 'personId', c.CAR_ID 'id', cm.CAR_MODEL_ID 'carModelId', c.CAR_NUMBER 'carNumber' FROM [dbo].[Cars] c
	INNER JOIN [dbo].[CarModels] AS cm 
		ON c.CAR_MODEL_ID = cm.CAR_MODEL_ID
	FOR JSON PATH	
END
GO;
----------------------SELECT END

----------------------ADD PROCEDURE
--ADD PERSON
CREATE PROCEDURE AddPerson @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	INSERT INTO Persons SELECT * FROM OPENJSON(@json)
		WITH(
			name VARCHAR(30),
			patronymic VARCHAR(30),
			surname VARCHAR(30),
			phone VARCHAR(20)
		)
END
GO;

--ADD CAR
CREATE PROCEDURE AddCar @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	INSERT INTO Cars(PERSON_ID, CAR_MODEL_ID, CAR_NUMBER) SELECT * FROM OPENJSON(@json)
		WITH(
			personId INT,
			carModelId INT,
			carNumber VARCHAR(20)
		)
END
GO;
----------------------ADD END

----------------------UPDATE PROCEDURE
--UPDATE PERSON
CREATE PROCEDURE UpdatePerson @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	UPDATE [dbo].[Persons]
		SET	
			FIRST_NAME = JSON_VALUE(@json, '$.name'),
			MIDDLE_NAME = JSON_VALUE(@json, '$.patronymic'),
			LAST_NAME = JSON_VALUE(@json, '$.surname'),
			PHONE = JSON_VALUE(@json, '$.phone')
		WHERE PERSON_ID = JSON_VALUE(@json, '$.id')
END
GO;

--UPDATE CAR
CREATE PROCEDURE UpdateCar @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	UPDATE [dbo].[Cars]
		SET 
			CAR_NUMBER = JSON_VALUE(@json, '$.carNumber'),
			CAR_MODEL_ID = JSON_VALUE(@json, '$.carModelId'),
			PERSON_ID = JSON_VALUE(@json, '$.personId')
		WHERE CAR_ID = JSON_VALUE(@json, '$.id')
END
GO;
----------------------UPDATE END

----------------------DELETE PROCEDURE
--DELETE PERSON
CREATE PROCEDURE DeletePerson @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	DELETE FROM [dbo].[Cars]
	WHERE PERSON_ID = JSON_VALUE(@json, '$.id')

	DELETE FROM [dbo].[Persons]
	WHERE PERSON_ID = JSON_VALUE(@json, '$.id')
END
GO;
--DELETE CAR
CREATE PROCEDURE DeleteCar @json NVARCHAR(MAX)
AS
IF(ISJSON(@json) > 0)
BEGIN
	DELETE FROM [dbo].[Cars]
	WHERE CAR_ID = JSON_VALUE(@json, '$.id')
END
GO;
----------------------DELETE END