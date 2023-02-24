import { Request, Response } from "express";
import { iUserReq } from "../interfaces/usersInterfaces";
import createUserService from "../services/users/createUserService";
import listAllUsersService from "../services/users/getAllUsersService";
import getLoggedUserService from "../services/users/getLoggedUserService";
import updateUserService from "../services/users/updateUserService";
import deleteUserService from "../services/users/deleteUserService";
import recoverUserService from "../services/users/recoverUserService";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iUserReq = req.body;

  const user = await createUserService(data);

  return res.status(201).json(user);
};

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsersArr = await listAllUsersService(req.body);

  return res.status(200).json(allUsersArr);
};

const getLoggedUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getLoggedUserService(req.user.id);

  return res.status(200).json(user);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const updatedUser = await updateUserService(req.body, +req.params.id);

  return res.status(201).json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteUserService(+req.params.id);

  return res.status(204).json();
};

const recoverUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await recoverUserService(+req.params.id);

  return res.status(200).json(user);
};

export {
  createUsersController,
  getAllUsersController,
  getLoggedUserController,
  updateUserController,
  deleteUserController,
  recoverUserController,
};
