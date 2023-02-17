import { Request, Response } from "express";
import { iUserReq } from "../interfaces/usersInterfaces";
import createUserService from "../services/users/createUserService";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: iUserReq = req.body;

  const user = await createUserService(data);

  return res.status(201).json(user);
};

export { createUsersController };
