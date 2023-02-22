import { Router } from "express";
import {
  createUsersController,
  getLoggedUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  recoverUserController,
} from "../controllers/usersControllers";
import {
  checkUniqueEmail,
  checkIfUserIsAdmin,
  matchLoggedUserWithParamId,
  checkValidId,
} from "../middlewares/usersMiddlewares";
import checkReqData from "../middlewares/validateDataMiddleware";
import checkIfTokenIsValid from "../middlewares/validateTokenMiddleware";
import { reqUserSchema } from "../schemas/usersSchemas";
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
  getAllUsersController
);

userRouters.get("/profile", checkIfTokenIsValid, getLoggedUserController);

userRouters.patch(
  "/:id",
  checkValidId,
  checkIfTokenIsValid,
  checkUniqueEmail,
  matchLoggedUserWithParamId,
  updateUserController
);

userRouters.delete(
  "/:id",
  checkValidId,
  checkIfTokenIsValid,
  matchLoggedUserWithParamId,
  deleteUserController
);

userRouters.put(
  "/:id/recover",
  checkValidId,
  checkIfTokenIsValid,
  matchLoggedUserWithParamId,
  recoverUserController
);

export default userRouters;
