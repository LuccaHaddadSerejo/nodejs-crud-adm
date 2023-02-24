import {
  checkIfUserExists,
  checkIfUserIsActive,
} from "../middlewares/usersMiddlewares";

import { Router } from "express";
import checkReqData from "../middlewares/validateDataMiddleware";
import { loginController } from "../controllers/loginControllers";
import { loginSchema } from "../schemas/loginSchemas";

const loginRouters: Router = Router();

loginRouters.post(
  "",
  checkReqData(loginSchema),
  checkIfUserExists,
  checkIfUserIsActive,
  loginController
);

export default loginRouters;
