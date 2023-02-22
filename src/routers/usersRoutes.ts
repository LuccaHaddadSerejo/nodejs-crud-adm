import { Router } from "express";
import {
  createUsersController,
  getLoggedUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers/usersControllers";
import {
  checkUniqueEmail,
  checkIfUserIsAdmin,
  matchLoggedUserWithParamId,
} from "../middlewares/usersMiddlewares";
import checkReqData from "../middlewares/validateDataMiddleware";
import checkIfTokenIsValid from "../middlewares/validateTokenMiddleware";
import { reqUserSchema, updateUserSchema } from "../schemas/usersSchemas";
const userRouters: Router = Router();

userRouters.post(
  "",
  checkReqData(reqUserSchema),
  checkUniqueEmail,
  createUsersController
);

userRouters.get(
  "",
  checkIfTokenIsValid,
  checkIfUserIsAdmin,
  listAllUsersController
);

userRouters.get("/profile", checkIfTokenIsValid, getLoggedUserController);

userRouters.patch(
  "/:id",
  checkIfTokenIsValid,
  checkUniqueEmail,
  matchLoggedUserWithParamId,
  updateUserController
);

export default userRouters;
