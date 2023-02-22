import { QueryConfig } from "pg";
import { iLoginReq } from "../../interfaces/loginInterfaces";
import { userQueryRes } from "../../interfaces/usersInterfaces";
import { client } from "../../database";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

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

  if (queryResult.rowCount === 0) {
    throw new AppError("Wrong email or password", 401);
  }

  const checkPassword: boolean = await compare(
    data.password,
    queryResult.rows[0].password
  );

  if (!checkPassword) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign(
    {
      teste: "teste",
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: queryResult.rows[0].id.toString(),
    }
  );

  return token;
};

export default loginService;
