import { Request, Response } from "express";
import { Project } from "../interfaces";
import { projectService } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const payload = req.body;
    const project: Project = await projectService.create(payload);
    return res.status(201).json(project);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.id);
    const project = await projectService.read(id);
    return res.status(200).json(project);
};

const update = async (req: Request, res: Response): Promise<Response> => {
    const payload: Project = {
        ...req.body,
        id: req.params.id
    };
    const developer = await projectService.update(payload);
    return res.status(200).json(developer);
};

export default { create, read, update };