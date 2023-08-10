import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import AppError from "../errors";
import { Project } from "../interfaces";

const idExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = Number(req.params.id);
    const queryString: string = `
    SELECT *
    FROM projects
    WHERE "id" = $1;
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    const queryResult = await client.query(queryConfig);
    const project: Project = queryResult.rows[0];
    if (project) {
        return next();
    } else {
        throw new AppError("Project not found.", 404);
    };
};

export default { idExists };