import { QueryResult } from "pg";
import {
  reqUserSchema,
  resUserSchema,
  resUserSchemaWithoutPassword,
  userSchema,
} from "../schemas/usersSchemas";
import { z } from "zod";

type iUserReq = z.infer<typeof reqUserSchema>;
type iUser = z.infer<typeof userSchema>;
type userRes = z.infer<typeof resUserSchema>;
type userResWithoutPassword = z.infer<typeof resUserSchemaWithoutPassword>;
type userQueryRes = QueryResult<userResWithoutPassword>;

export { iUserReq, iUser, userRes, userResWithoutPassword, userQueryRes };
