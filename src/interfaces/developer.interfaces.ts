import { QueryResult } from "pg";
import { OS } from "./developerInfo.interfaces";

type Developer = {
    id: number,
    name: string,
    email: string
};

type DeveloperResult = QueryResult<Developer>;
type DeveloperCreate = Omit<Developer, "id">;

type DeveloperWithInfo = {
    developerId: number,
    developerName: string,
    developerEmail: string,
    developerInfoDeveloperSince: Date | null,
    developerInfoPreferredOS: OS | null
};

type DeveloperWithInfoResult = QueryResult<DeveloperWithInfo>;

export {
    Developer,
    DeveloperResult,
    DeveloperCreate,
    DeveloperWithInfo,
    DeveloperWithInfoResult
};