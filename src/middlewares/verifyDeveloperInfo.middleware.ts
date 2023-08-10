import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors";
import { DeveloperInfo } from "../interfaces";

export const exists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id = Number(res.locals.developer.id);
    const queryString: string = `
    SELECT *
    FROM "developerInfos"
    WHERE "developerId" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);
    const foundInfo: DeveloperInfo = queryResult.rows[0];
    if (!foundInfo) {
        return next();
    } else {
        throw new AppError("Developer infos already exists.", 409);
    };
};

export const isValid = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const developerSince = req.body.developerSince;
    const preferredOS = req.body.preferredOS;
    const validDate = new Date(req.body.developerSince);
    const OSList = ["Windows", "Linux", "MacOS"];

    if (developerSince && validDate instanceof Date === false) {
        throw new AppError("Invalid Date option.", 400);
    } else if (preferredOS && !OSList.some(OS => preferredOS.includes(OS))) {
        throw new AppError("Invalid OS option.", 400);
    } else {
        if (validDate) {
            res.locals.payload = {
                ...req.body,
                developerSince: validDate,
                developerId: res.locals.developer.id
            };
            return next();
        } else {
            res.locals.payload = {
                ...req.body,
                developerId: res.locals.developer.id
            };
        };
    };
};

export default { exists, isValid };