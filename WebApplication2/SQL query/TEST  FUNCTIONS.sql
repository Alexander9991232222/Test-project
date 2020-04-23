CREATE FUNCTION GetAllPersonsInfo()
RETURNS TABLE
AS 
RETURN(
SELECT
	p.PERSON_ID 'id',
	p.FIRST_NAME 'name', 
	p.LAST_NAME 'surname',
	p.MIDDLE_NAME 'patronymic',
	p.PHONE 'phone'
FROM [Persons] p
)
GO;