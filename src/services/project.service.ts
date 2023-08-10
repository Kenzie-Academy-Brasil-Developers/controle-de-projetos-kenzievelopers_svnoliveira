import format from "pg-format";
import { Project, ProjectCreate, ProjectResult, ProjectWithDeveloper, ProjectWithDeveloperResult } from "../interfaces";
import { client } from "../database";
import { QueryConfig } from "pg";

const create = async (payload: ProjectCreate): Promise<Project> => {
    const queryFormat: string = format(
        `
        INSERT INTO "projects" (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: ProjectResult = await client.query(queryFormat);
    return queryResult.rows[0];
};

const read = async (id: number): Promise<ProjectWithDeveloper> => {
    const queryString: string = `
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
	    p.id = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    };
    const queryResult: ProjectWithDeveloperResult = await client.query(queryConfig);
    return queryResult.rows[0];
};

const update = async (payload: Project): Promise<Project> => {
    
    const queryFormat: string = format(
    `
    UPDATE 
	    projects 
    SET (%I) = ROW(%L)
    WHERE 
	    "id" = $1
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
    );

    const queryConfig: QueryConfig = {
        text: queryFormat,
        values: [payload.id]
    };

    const queryResult: ProjectResult = await client.query(queryConfig);
    return queryResult.rows[0];
};

export default { create, read, update };