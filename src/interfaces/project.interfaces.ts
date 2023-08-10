import { QueryResult } from "pg";

type Project = {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: Date,
    endDate: Date | null,
    developerId: number | null
};

type ProjectResult = QueryResult<Project>;
type ProjectCreate = Omit<Project, "id">;

type ProjectWithDeveloper = {
    projectId: number,
    projectName: string,
    projectDescription: string,
    projectRepository: string,
    startDate: Date,
    endDate: Date | null,
    projectDeveloperName: string
};

type ProjectWithDeveloperResult = QueryResult<ProjectWithDeveloper>;

export {
    Project,
    ProjectResult,
    ProjectCreate,
    ProjectWithDeveloper,
    ProjectWithDeveloperResult
};