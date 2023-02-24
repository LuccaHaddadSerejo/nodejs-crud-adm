import {
  userQueryRes,
  userWithoutPassword,
} from "../../interfaces/usersInterfaces";
import { QueryConfig } from "pg";
import { client } from "../../database";
import { resUserSchemaWithoutPassword } from "../../schemas/usersSchemas";

const getLoggedUserService = async (
  data: number
): Promise<userWithoutPassword> => {
  const id: number = data;

  const queryString = `
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

  const queryResult: userQueryRes = await client.query(queryConfig);

  return resUserSchemaWithoutPassword.parse(queryResult.rows[0]);
};

export default getLoggedUserService;
