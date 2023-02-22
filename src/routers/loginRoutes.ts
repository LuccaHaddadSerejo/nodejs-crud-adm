import { Router } from "express";
import { loginController } from "../controllers/loginControllers";
import {
  checkIfUserExists,
  checkIfUserIsActive,
} from "../middlewares/usersMiddlewares";
import checkReqData from "../middlewares/validateDataMiddleware";
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
