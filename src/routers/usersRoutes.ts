import {
  checkIfUserIsAdmin,
  checkUniqueEmail,
  checkValidId,
  matchLoggedUserWithParamId,
} from "../middlewares/usersMiddlewares";
import {
  createUsersController,
  deleteUserController,
  getAllUsersController,
  getLoggedUserController,
  recoverUserController,
  updateUserController,
} from "../controllers/usersControllers";
import { reqUserSchema, updateUserSchema } from "../schemas/usersSchemas";
import { Router } from "express";
import checkIfTokenIsValid from "../middlewares/validateTokenMiddleware";
import checkReqData from "../middlewares/validateDataMiddleware";

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
  checkReqData(updateUserSchema),
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
  checkIfTokenIsValid,
  checkIfUserIsAdmin,
  checkValidId,
  recoverUserController
);

export default userRouters;
