import { Request, Response } from "express";
import { iUserReq } from "../interfaces/usersInterfaces";
import createUserService from "../services/users/createUserService";
import listAllUsersService from "../services/users/getAllUsersService";
import getLoggedUserService from "../services/users/getLoggedUserService";
import updateUserService from "../services/users/updateUserService";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iUserReq = req.body;

  const user = await createUserService(data);

  return res.status(201).json(user);
};

const listAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsersArr = await listAllUsersService(req.body);

  return res.status(201).json(allUsersArr);
};

const getLoggedUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getLoggedUserService(req.user.id);

  return res.status(201).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedUser = await updateUserService(req.body, req.user.id);

  return res.status(201).json(updatedUser);
};

export {
  createUsersController,
  listAllUsersController,
  getLoggedUserController,
  updateUserController,
};
