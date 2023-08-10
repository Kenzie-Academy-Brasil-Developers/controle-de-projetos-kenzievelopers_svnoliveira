import { QueryResult } from "pg";

type OS = "Windows" | "Linux" | "MacOs";

type DeveloperInfo = {
    id: number,
    developerSince: Date,
    preferredOS: OS,
    developerId: number,
};

type DeveloperInfoResult = QueryResult<DeveloperInfo>;
type DeveloperInfoCreate = Omit<DeveloperInfo, "id" | "developerId">;

export {
    OS,
    DeveloperInfo,
    DeveloperInfoResult,
    DeveloperInfoCreate,
};