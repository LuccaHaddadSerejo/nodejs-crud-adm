import "dotenv/config";
import { AppError } from "../../errors";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { compare } from "bcryptjs";
import { iLoginReq } from "../../interfaces/loginInterfaces";
import { iUser } from "../../interfaces/usersInterfaces";
import jwt from "jsonwebtoken";
import { userQueryRes } from "../../interfaces/usersInterfaces";

const loginService = async (data: iLoginReq): Promise<string> => {
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
    values: [data.email],
  };

  const queryResult: userQueryRes = await client.query(queryConfig);

  const foundUser: iUser = queryResult.rows[0];

  if (!foundUser) {
    throw new AppError("Wrong email or password", 401);
  }

  const checkPassword: boolean = await compare(
    data.password,
    foundUser.password
  );

  if (!checkPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      admin: foundUser.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: foundUser.id + "",
    }
  );

  return token;
};

export default loginService;
