import { client } from "../../database";
import format from "pg-format";
import { QueryConfig } from "pg";
import { AppError } from "../../errors";
import {
  iUserReq,
  userQueryRes,
  userResWithoutPassword,
} from "../../interfaces/usersInterfaces";

const createUserService = async (
  data: iUserReq
): Promise<userResWithoutPassword> => {
  let queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [data.email],
  };

  let queryResult: userQueryRes = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    throw new AppError("User already exists", 409);
  }

  queryString = format(
    `
            INSERT INTO
                users (%I)
            VALUES 
                (%L)
            RETURNING id, name, email, admin, active;
        `,
    Object.keys(data),
    Object.values(data)
  );

  queryResult = await client.query(queryString);

  return queryResult.rows[0];
};

export default createUserService;
