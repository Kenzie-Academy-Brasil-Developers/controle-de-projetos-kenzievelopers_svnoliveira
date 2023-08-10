import format from "pg-format";
import { Developer, DeveloperCreate, DeveloperResult, DeveloperWithInfo, DeveloperWithInfoResult } from "../interfaces";
import { client } from "../database";
import { QueryConfig } from "pg";

const create = async (payload: DeveloperCreate): Promise<Developer> => {
    const queryFormat: string = format(
        `
        INSERT INTO developers (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: DeveloperResult = await client.query(queryFormat);
    return queryResult.rows[0];
};

const read = async (id: number): Promise<DeveloperWithInfo> => {
    const queryString: string = `
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
	    d.id = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    };
    const queryResult: DeveloperWithInfoResult = await client.query(queryConfig);
    return queryResult.rows[0];
};

const update = async (payload: Developer): Promise<Developer> => {

    const queryFormat: string = format(
        `
    UPDATE 
	    developers 
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

    const queryResult: DeveloperResult = await client.query(queryConfig);
    return queryResult.rows[0];
};

const destroy = async (id: number): Promise<boolean> => {
    const queryString: string = `
    DELETE FROM developers 
    WHERE "id" = $1;
    `;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    };
    await client.query(queryConfig);
    return true;
};

export default { create, read, update, destroy };