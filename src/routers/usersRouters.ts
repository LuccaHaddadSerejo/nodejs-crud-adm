import { Router } from "express";
import { createUsersController } from "../controllers/usersControllers";
import { checkIfUserExists } from "../middlewares/usersMiddlewares";

const userRouters: Router = Router();

userRouters.post("", createUsersController);

export default userRouters;
