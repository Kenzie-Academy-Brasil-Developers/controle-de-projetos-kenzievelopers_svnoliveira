import { Router } from "express";
import { developerController, developerInfoController } from "../controllers";
import { verifyDeveloperInfoMiddleware, verifyDeveloperMiddleware } from "../middlewares";

const developerRouter: Router = Router();

developerRouter.post("", 
    verifyDeveloperMiddleware.emailExists, 
    developerController.create
);
developerRouter.get("/:id", 
    verifyDeveloperMiddleware.idExists, 
    developerController.read
);
developerRouter.patch("/:id",
    verifyDeveloperMiddleware.idExists,
    verifyDeveloperMiddleware.emailExists,
    developerController.update
);
developerRouter.delete("/:id",
    verifyDeveloperMiddleware.idExists,
    developerController.destroy
);


developerRouter.post("/:id/infos",
    verifyDeveloperMiddleware.idExists,
    verifyDeveloperInfoMiddleware.exists,
    verifyDeveloperInfoMiddleware.isValid,
    developerInfoController.create
);

export default developerRouter;