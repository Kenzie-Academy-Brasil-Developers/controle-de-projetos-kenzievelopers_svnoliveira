import format from "pg-format";
import { DeveloperInfo, DeveloperInfoCreate, DeveloperInfoResult } from "../interfaces";
import { client } from "../database";

const create = async (payload: DeveloperInfoCreate): Promise<DeveloperInfo> => {

    const queryFormat: string = format(
        `
        INSERT INTO "developerInfos" (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );
    const queryResult: DeveloperInfoResult = await client.query(queryFormat);
    return queryResult.rows[0];
};

export default { create };