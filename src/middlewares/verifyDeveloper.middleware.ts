import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors";
import { Developer } from "../interfaces";

const emailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const email: string = req.body.email;
    const queryString: string = `
    SELECT "email"
    FROM developers
    WHERE LOWER("email") = LOWER($1);
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [email],
    };
    const queryResult: QueryResult = await client.query(queryConfig);
    const foundEmail: string | undefined = queryResult.rows[0]

    if (!foundEmail) {
        return next();
    } else {
        throw new AppError("Email already exists.", 409)
    }
};

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = Number(req.body.developerId) || Number(req.params.id);
    const queryString: string = `
    SELECT *
    FROM developers
    WHERE "id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);
    const developer: Developer = queryResult.rows[0];
    if (developer) {
        res.locals.developer = developer;
        return next();
    } else {
        throw new AppError("Developer not found.", 404);
    };
};

export default { emailExists, idExists };