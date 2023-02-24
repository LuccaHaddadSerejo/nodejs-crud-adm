import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  iUserReq,
  userWithoutPassword,
  userQueryResWithoutPassword,
} from "../../interfaces/usersInterfaces";
import { resUserSchemaWithoutPassword } from "../../schemas/usersSchemas";

const updateLoggedUser = async (
  data: iUserReq,
  id: number
): Promise<userWithoutPassword> => {
  let queryString: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            id = $1
      `;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: userQueryResWithoutPassword = await client.query(
    queryConfig
  );

  queryString = format(
    `
        UPDATE 
            users
        SET (%I) = ROW(%L)
        WHERE 
            id = $1
        RETURNING *;
      `,
    Object.keys(data),
    Object.values(data)
  );

  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  return resUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default updateLoggedUser;
