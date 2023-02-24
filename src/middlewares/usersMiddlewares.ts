import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors";
import { client } from "../database";
import { userQueryRes } from "../interfaces/usersInterfaces";

const checkIfUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = req.body.email;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  return next();
};

const checkValidId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = +req.params.id;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("User not found", 404);
  }

  return next();
};

const checkUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = req.body.email;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: userQueryRes = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered", 409);
  }

  return next();
};

const checkIfUserIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = req.body.email;

  const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: userQueryRes = await client.query(queryConfig);

  if (!queryResult.rows[0].active) {
    throw new AppError("Wrong email or password", 401);
  }

  return next();
};

const checkIfUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  if (!req.user.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};

const matchLoggedUserWithParamId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const loggedUserId: number = +req.user.id;
  const paramId: number = +req.params.id;

  if (req.user.admin) {
    return next();
  }

  if (loggedUserId !== paramId) {
    throw new AppError("Insufficient Permission", 403);
  } else {
    return next();
  }
};

export {
  checkIfUserExists,
  checkValidId,
  checkIfUserIsActive,
  checkUniqueEmail,
  checkIfUserIsAdmin,
  matchLoggedUserWithParamId,
};
