import { QueryResult } from "pg";

interface iUserReq {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

interface iUser extends iUserReq {
  id: number;
}

type userRes = Omit<iUser, "id" | "password">;
type userResWithoutPassword = Omit<iUser, "password">;
type userQueryRes = QueryResult<userResWithoutPassword>;

export { iUserReq, iUser, userRes, userResWithoutPassword, userQueryRes };
