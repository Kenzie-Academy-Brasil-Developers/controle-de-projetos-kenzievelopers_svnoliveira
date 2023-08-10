--create developer
INSERT INTO developers ("name" , "email")
VALUES ('Jonathan', 'jonathan@gmail.com')
RETURNING *;

--read developer by ID
SELECT 
	d.id "developerId",
	d."name"  "developerName",
	d.email "developerEmail",
	di."developerSince" "developerInfoDeveloperSince",
	di."preferredOS"  "developerInfoPreferredOS"
FROM 
	developers AS d
LEFT JOIN 
	"developerInfos" AS di
ON 
	d.id = di."developerId"
WHERE 
	d.id = 1;

--update
UPDATE 
	developers 
SET 
	"name" = 'Exterminador do futuro',
	"email" = 'exterminador@gmail.com'
WHERE 
	"id" = 1
RETURNING *;

--delete
DELETE FROM developers 
WHERE "id" = 1;

--create info
INSERT INTO "developerInfos"  ("developerSince" , "preferredOS", "developerId")
VALUES ('2013-01-01', 'MacOS', 1)
RETURNING *;


--PROJECTS
--create project
INSERT INTO "projects" ("name", "description", "repository", "startDate", "endDate", "developerId")
VALUES ('fashion store', 'loja de roupas lorem psium', 'github.com/lorena', '2013-01-01', null, 1)
RETURNING *;

--select by project ID
SELECT 
	p.id "projectId",
	p."name" "projectName",
	p.description "projectDescription",
	p.repository "projectRepository",
	p."startDate" "projectStartDate",
	p."endDate" "projectEndDate",
	d."name" "projectDeveloperName"
FROM 
	projects AS p
LEFT JOIN
	developers AS d
ON 
	d.id = p."developerId"
WHERE 
	p.id = 1;

--Update
UPDATE 
	projects 
SET 
	"name" = 'kenzie movie',
	"description" = 'blablabvlalsla',
	"repository" = 'exterminador.github',
	"startDate" = '2020-01-01',
	"endDate" = '2023-08-09',
	"developerId" = 2	
WHERE 
	"id" = 1
RETURNING *;