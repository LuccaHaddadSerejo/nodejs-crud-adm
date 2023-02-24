import {
  reqUserSchema,
  resUserSchemaWithoutPassword,
  userSchema,
} from "../schemas/usersSchemas";
import { QueryResult } from "pg";
import { z } from "zod";

type iUserReq = z.infer<typeof reqUserSchema>;
type iUser = z.infer<typeof userSchema>;
type userWithoutPassword = z.infer<typeof resUserSchemaWithoutPassword>;
type usersList = Array<userWithoutPassword>;

type userQueryResWithoutPassword = QueryResult<userWithoutPassword>;
type userQueryRes = QueryResult<iUser>;

export {
  iUserReq,
  iUser,
  userWithoutPassword,
  userQueryResWithoutPassword,
  userQueryRes,
  usersList,
};
