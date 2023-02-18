import { Router } from "express";
import { createUsersController } from "../controllers/usersControllers";
import { checkIfUserExists } from "../middlewares/usersMiddlewares";
import checkReqData from "../middlewares/validateDataMiddleware";
import { reqUserSchema } from "../schemas/usersSchemas";
const userRouters: Router = Router();

userRouters.post("", checkReqData(reqUserSchema), createUsersController);

export default userRouters;
