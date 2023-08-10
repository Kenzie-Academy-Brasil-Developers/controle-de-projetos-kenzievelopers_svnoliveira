import { Router } from "express";
import { projectController } from "../controllers";
import { verifyDeveloperMiddleware, verifyProjectMiddleware } from "../middlewares";

const projectRouter: Router = Router();

projectRouter.post("",
    verifyDeveloperMiddleware.idExists,
    projectController.create
);

projectRouter.get("/:id",
    verifyProjectMiddleware.idExists,
    projectController.read
);

projectRouter.patch("/:id",
    verifyProjectMiddleware.idExists,
    verifyDeveloperMiddleware.idExists,
    projectController.update
);
export default projectRouter;