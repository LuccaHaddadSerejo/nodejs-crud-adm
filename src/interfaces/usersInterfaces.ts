import { QueryResult } from "pg";
import {
  reqUserSchema,
  resUserSchemaWithoutPassword,
  updateUserSchema,
  userSchema,
} from "../schemas/usersSchemas";
import { z } from "zod";

type iUserReq = z.infer<typeof reqUserSchema>;
type iUser = z.infer<typeof userSchema>;
type userWithoutPassword = z.infer<typeof resUserSchemaWithoutPassword>;
type usersList = Array<userWithoutPassword>;
type updatedUser = z.infer<typeof updateUserSchema>;

type userQueryResWithoutPassword = QueryResult<userWithoutPassword>;
type userQueryRes = QueryResult<iUser>;

export {
  iUserReq,
  iUser,
  userWithoutPassword,
  userQueryResWithoutPassword,
  userQueryRes,
  usersList,
  updatedUser,
};
