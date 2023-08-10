import { Request, Response } from "express";
import { DeveloperInfo } from "../interfaces";
import { developerInfoService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const payload = res.locals.payload
    const developerInfo: DeveloperInfo = await developerInfoService.create(payload);
    return res.status(201).json(developerInfo);
};

export default { create };