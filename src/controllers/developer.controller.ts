import { Request, Response } from "express";
import { developerService } from "../services";
import { Developer } from "../interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
    const developer = await developerService.create(req.body);
    return res.status(201).json(developer);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const id: number = res.locals.developer.id;
    const developer = await developerService.read(id);
    return res.status(200).json(developer);
};

const update = async (req: Request, res: Response): Promise<Response> => {
    const payload: Developer = {
        ...res.locals.developer,
        ...req.body,
    };
    const developer = await developerService.update(payload);
    return res.status(200).json(developer);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
    const id: number = res.locals.developer.id;
    await developerService.destroy(id);
    return res.status(204).send();
};

export default { create, read, update, destroy };